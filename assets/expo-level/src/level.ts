import {
  AbstractBatchOperation,
  AbstractBatchOptions,
  AbstractClearOptions,
  AbstractDatabaseOptions,
  AbstractDelOptions,
  AbstractGetManyOptions,
  AbstractGetOptions,
  AbstractIterator,
  AbstractIteratorOptions,
  AbstractLevel,
  AbstractOpenOptions,
  AbstractPutOptions,
  AbstractSeekOptions,
  NodeCallback
} from 'abstract-level';
import {LevelDB, LevelDBIterator} from 'react-native-leveldb';
import ModuleError from 'module-error';
import type {NextCallback} from 'abstract-level/types/abstract-iterator';
import * as fs from "expo-file-system";

export class ExpoLevelIterator<K, V> extends AbstractIterator<ExpoLevel<K, V>, Uint8Array, Uint8Array> {
  it: LevelDBIterator;
  valid: boolean = true;
  options: AbstractIteratorOptions<Uint8Array, Uint8Array>;
  hasLimit: boolean;
  isReversed: boolean;
  readsKeys: boolean;
  readsValues: boolean;
  startingBoundIsOpen: boolean = false;
  endingBoundIsOpen: boolean = false;
  stepCount = 0;
  startingBound?: Uint8Array;
  endingBound?: Uint8Array;

  busy = false;

  startedReading = false;

  constructor(db: any, options: AbstractIteratorOptions<Uint8Array, Uint8Array>) {
    super(db, options);
    const level = this.db._db!;
    // console.log('iterator options was', options);
    this.it = level.newIterator();
    this.options = options;
    this.hasLimit = (options.limit != undefined) && (options.limit != -1);
    this.isReversed = options.reverse || false;
    this.readsKeys = (options.keys != undefined ? options.keys : true);
    this.readsValues = (options.values != undefined) ? options.values : true;

    let lowerBound: Uint8Array | undefined;
    let upperBound: Uint8Array | undefined;
    let lowerBoundIsOpen = true;
    let upperBoundIsOpen = true;

    // Counter-intuitively, you don't need to check if gt >= gte, or lt <= lte
    // Because according to the test suite... there's a priority!
    // gte has higher priority than gt, and lte has higher priority than lt!
    // so we just check them later that's all
    if (options.gt != undefined) {
      lowerBound = options.gt;
      lowerBoundIsOpen = false;
    }
    if (options.gte != undefined) {
      lowerBound = options.gte;
      lowerBoundIsOpen = true;
    }
    if (options.lt != undefined) {
      upperBound = options.lt;
      upperBoundIsOpen = false;
    }
    if (options.lte != undefined) {
      upperBound = options.lte;
      upperBoundIsOpen = true;
    }
    // }
    const startingBound = options.reverse ? upperBound : lowerBound;
    if (startingBound != undefined) {
      this.startingBoundIsOpen = this.isReversed ? upperBoundIsOpen : lowerBoundIsOpen;
      this.it.seek(toBuffer(startingBound));
      this.startingBound = startingBound;
      if (this.it.valid()) {
        const comparison = this.it.compareKey(toBuffer(startingBound));
        if ((!(this.isReversed ? upperBoundIsOpen : lowerBoundIsOpen) && comparison == 0) || (this.isReversed && comparison > 0)) {
          this.isReversed ? this.it.prev() : this.it.next();
        }
      } else if (this.isReversed) {
        // We must have seeked past the end.
        this.it.seekLast();
      }
    } else {
      if (this.isReversed) {
        this.it.seekLast();
      } else {
        // Just... assume it's at first?
        this.it.seekToFirst();
      }
      // this.isReversed ? this.it.seekLast() : this.it.seekToFirst();
    }

    const endingBound = options.reverse ? lowerBound : upperBound;
    if (endingBound != undefined) {
      this.endingBoundIsOpen = this.isReversed ? lowerBoundIsOpen : upperBoundIsOpen;
      this.endingBound = endingBound;
      // self.endingSliceStorage = ...
    } else {
      // nothing?
      // self.endingSliceStorage = NULL
    }
  }

  async* [Symbol.iterator]() {
    try {
      let item

      while ((item = (await this.next())) !== undefined) {
        yield item
      }
    } finally {
      if (this.valid) await this.close()
    }
  }

  current(): [ArrayBuffer | undefined, ArrayBuffer | undefined] | undefined {
    if (this.isEnded()) {
      return undefined;
    }
    let key: ArrayBuffer | undefined = this.readsKeys ? this.it.keyBuf() : undefined;
    let val: ArrayBuffer | undefined = this.readsValues ? this.it.valueBuf() : undefined;
    return [key, val];
  }

  // An empty array signifies the natural end of the iterator
  // so simply yielding a non-empty array signifies non-end
  protected _next(callback: NextCallback<Uint8Array, Uint8Array>): void {
    if (this.busy) {
      callback(new ModuleError('Iterator is busy', {code: 'LEVEL_ITERATOR_BUSY'}));
      return;
    } else if (!this.valid) {
      callback(new ModuleError('Iterator is not open', {code: 'LEVEL_ITERATOR_NOT_OPEN'}));
      return;
    }
    // need to set busy to pass compliance
    this.busy = true;
    try {
      let gotKey: Uint8Array | undefined;
      let gotValue: Uint8Array | undefined;

      if (this.it.valid()) {
        // If already started reading, then next() should move the iterator
        if (this.startedReading) {
          if (this.options.reverse) {
            this.it.prev();
          } else {
            this.it.next();
          }
        } else {
          // never started reading yet; just use the same pos.
          this.startedReading = true;
        }
        if (this.isEnded()) {
          gotKey = undefined;
          gotValue = undefined;
        } else {
          if (this.readsKeys) {
            gotKey = fromBuffer(this.it.keyBuf());
          }
          if (this.readsValues) {
            gotValue = fromBuffer(this.it.valueBuf());
          }
        }
      } else {
        gotKey = undefined;
        gotValue = undefined;
      }
      this.db.nextTick(callback, null, gotKey, gotValue);
      this.busy = false;
    } catch (e) {
      this.busy = false;
      this.db.nextTick(callback, e);
    }
  }

  protected _seek(target: Uint8Array, options: AbstractSeekOptions<Uint8Array>): void {
    if (!this.valid) {
      return;
    }
    // Reference : https://github.com/andymatuschak/react-native-leveldown/blob/e7d14cfdf81558d15ecec76e956269081d12a40b/ios/RNLeveldown.mm#L388
    this.it.seek(toBuffer(target));
    if (this.isReversed) {
      if (!this.it.valid()) {
        // We must have seeked past the end.
        this.it.seekLast();
      }
      // TODO: Change this back once package is patched
      else if (this.it.compareKey(toBuffer(target)) > 0) {
        // We seeked past the target; step back.
        if (this.isReversed) {
          this.it.prev();
        } else {
          this.it.next();
        }
      }
    }
    this.startedReading = false;
  }

  protected _close(callback: NodeCallback<void>): void {
    if (!this.valid) return;

    this.valid = false;
    this.it.close();
    this.db._openIterators.delete(this);
    this.db.nextTick(callback);
  }

  protected isEnded(): boolean {
    // following https://github.com/andymatuschak/react-native-leveldown/blob/e7d14cfdf81558d15ecec76e956269081d12a40b/ios/RNLeveldown.mm#L162
    if (!this.it.valid()) {
      return true;
    }
    if (this.hasLimit && this.stepCount >= this.limit) {
      return true;
    }
    if (this.endingBound != undefined) {
      const comparison = this.it.compareKey(toBuffer(this.endingBound))
      if ((comparison < 0 && this.isReversed) || (comparison > 0 && !this.isReversed) || (comparison == 0 && !this.endingBoundIsOpen)) {
        return true;
      }
    }
    if (this.startingBound != undefined) {
      const comparison = this.it.compareKey(toBuffer(this.startingBound));
      if ((comparison > 0 && this.isReversed) || (comparison < 0 && !this.isReversed) || (comparison == 0 && !this.startingBoundIsOpen)) {
        return true;
      }
    }
    return false;
  }
}


export class ExpoLevel<K, V> extends AbstractLevel<Uint8Array, K, V> {
  _db?: LevelDB;
  location: string;
  _openIterators: Set<ExpoLevelIterator<K, V>> = new Set();

  constructor(
    location: string,
    options?: AbstractDatabaseOptions<K, V> | undefined
  ) {
    super({
      encodings: {
        "view": true
      },
      seek: true,
      streams: false,
      createIfMissing: true,
      errorIfExists: true,
      permanence: true,
      snapshots: false,
    }, options);

    this.location = location;
  }

  protected async _open(options: AbstractOpenOptions, callback: NodeCallback<void>): Promise<void> {
    const {
      createIfMissing = true, errorIfExists = false
    } = options;
    try {
      if (errorIfExists) {
        // sometimes the LevelDB cannot report error for errorIfExists
        const realLocation = fs.documentDirectory + this.location;
        const info = await fs.getInfoAsync(realLocation)

        if (info.exists) {
          throw {message: 'File already exists'};
        }
      }

      this._db = new LevelDB(this.location, createIfMissing, errorIfExists);
      this.nextTick(callback, null);
    } catch (e: any) {
      const msg = ((e as any).message as string);
      if (msg.includes('does not exist')) {
        const err = new ModuleError(msg, {code: 'LEVEL_DATABASE_NOT_OPEN'})
        // console.log('msg has does not exist');
        this.nextTick(callback, err);
      } else if (msg.includes('exists')) {
        const err = new ModuleError(msg, {code: 'LEVEL_DATABASE_NOT_OPEN'})
        // console.log('msg has already exists');
        this.nextTick(callback, err);
        // this.nextTick(callback, e);
      } else {
        console.log('open error', 'type', typeof e, e.code, e.message);
        throw e;
      }
    }
  }

  protected _close(callback: NodeCallback<void>): void {
    try {
      if (this._openIterators.size) {
        for (const it of this._openIterators) {
          it.valid = false;
          it.it.close();
        }
      }
      if (!this._db!.closed) {
        this._db!.close();
      }
      this.nextTick(callback, null);
    } catch (e) {
      this.nextTick(callback, e);
    }
  }

  protected _get(
    key: Uint8Array,
    options: AbstractGetOptions<K, V>,
    callback: NodeCallback<Uint8Array>
  ): void {
    this.nextTick(() => {
      try {
        const value = this._db!.getBuf(toBuffer(key));
        if (value === null) { // not found
          callback(new ModuleError(`Key ${key} was not found`, {code: 'LEVEL_NOT_FOUND'}));
          return;
        }
        callback(null, fromBuffer(value));
      } catch (e) {
        callback(error(e));
      }
    })
  }

  protected _getMany(
    keys: Uint8Array[],
    options: AbstractGetManyOptions<K, V>,
    callback: NodeCallback<(Uint8Array | undefined)[]>
  ): void {
    this.nextTick(() => {
      try {
        const values = keys.map((key) => {
          const value = this._db!.getBuf(toBuffer(key));
          if (value === null) { // not found
            return undefined;
          } else {
            return fromBuffer(value);
          }
        });
        callback(null, values);
      } catch (e) {
        callback(error(e));
      }
    });
  }

  protected _put(
    key: Uint8Array,
    value: Uint8Array,
    options: AbstractPutOptions<K, V>,
    callback: NodeCallback<void>
  ): void {
    this.nextTick(() => {
      try {
        this._db!.put(toBuffer(key), toBuffer(value));
        callback(undefined);
      } catch (e) {
        callback(error(e));
      }
    });
  }

  protected _del(
    key: Uint8Array, options: AbstractDelOptions<K>, callback: NodeCallback<void>
  ): void {
    this.nextTick(() => {
      try {
        this._db!.delete(toBuffer(key));
        callback(undefined);
      } catch (e) {
        callback(error(e));
      }
    });
  }

  protected _batch(
    operations: Array<AbstractBatchOperation<unknown, Uint8Array, Uint8Array>>,
    options: AbstractBatchOptions<K, V>,
    callback: NodeCallback<void>
  ): void {
    // TODO: Maybe see if we can add batch to actual react-native-leveldb?
    // Or just doing this is enough...

    this.nextTick(() => {
      try {
        for (const operation of operations) {
          switch (operation.type) {
            case "put":
              this._db!.put(toBuffer(operation.key), toBuffer(operation.value));
              break;
            case "del":
              this._db!.delete(toBuffer(operation.key));
              break;
          }
        }
        callback(undefined);
      } catch (e) {
        callback(error(e));
      }
    });
  }

  protected _iterator(options: AbstractIteratorOptions<Uint8Array, Uint8Array>) {
    const it = new ExpoLevelIterator<K, V>(this, options);
    this._openIterators.add(it);
    return it;
  }

  // Hopefully can do this better later with native implementaion?
  _clear(options: AbstractClearOptions<K>, callback: NodeCallback<void>) {
    const _clear_inner = async () => {
      const it = this.iterator({...options, values: false});
      try {
        const keys: Uint8Array[] = [];
        while (true) {
          const kv = await it.next();
          if (!kv) {
            break;
          }
          keys.push(kv[0] as any as Uint8Array);
        }

        for (const k of keys) {
          this._db!.delete(toBuffer(k));
        }
      } finally {
        await it.close();
      }
    }

    _clear_inner().then(() => {
      callback(undefined)
    }).catch((e) => {
      callback(error(e))
    });
  }
}

function error(e: unknown): Error {
  if (e instanceof Error) {
    return e;
  }

  return new Error(`${e}`);
}

function toBuffer(array: Uint8Array): ArrayBuffer {
  return array.buffer.slice(
    array.byteOffset,
    array.byteLength + array.byteOffset
  );
}

function fromBuffer(buf: ArrayBuffer): Uint8Array {
  return new Uint8Array(buf);
}
