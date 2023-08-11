/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import type {
  AbstractKeyIteratorOptions,
  AbstractLevel as AbstractLevelType,
} from "abstract-level";
import {
  AbstractDatabaseOptions,
  AbstractIterator,
  AbstractKeyIterator,
  AbstractLevel,
  AbstractValueIterator,
} from "abstract-level";

export type LevelErrorCode =
  | "LEVEL_PUT_ERROR"
  | "LEVEL_NOT_FOUND"
  | "LEVEL_GET_ERROR"
  | "LEVEL_DEL_ERROR"
  | "LEVEL_INVALID_VALUE"
  | "LEVEL_IO_ERROR";

export class LevelError extends Error {
  public code: LevelErrorCode;

  constructor(message: string, code: LevelErrorCode) {
    super(message);
    this.name = "LevelError";
    this.code = code;
  }
}

export type ValueType = string;

export class RNAsyncStorageLevel extends AbstractLevel<
  string,
  string,
  ValueType
> {
  protected storage: AsyncStorageStatic;

  protected location: string;

  constructor(
    location: string,
    options?: AbstractDatabaseOptions<string, string>
  ) {
    const manifest: Partial<AbstractLevelType<string>["supports"]> = {
      getMany: true,
      snapshots: false,
      permanence: true,
      keyIterator: false,
      valueIterator: false,
      iteratorNextv: false,
      iteratorAll: true,
      streams: false,
      seek: false,
      encodings: {
        buffer: true,
      },
      events: {
        opening: true,
        open: true,
        closing: true,
        closed: true,
        put: true,
        del: true,
        batch: false,
        clear: true,
      },
    };
    const mergedOptions: AbstractDatabaseOptions<string, string> = {
      createIfMissing: true,
      errorIfExists: false,
      keyEncoding: "utf8",
      valueEncoding: "utf8",
      ...options,
    };

    super(manifest, mergedOptions);
    this.location = location;
  }

  public setStorage(storage: AsyncStorageStatic): void {
    this.storage = storage;
  }

  protected _open(
    options: any,
    callback: (err?: Error | null) => void = () => {}
  ): void {
    // AsyncStorage does not need an explicit open call.
    if (this.storage === undefined) {
      queueMicrotask(() => {
        callback(new LevelError("Storage not set", "LEVEL_IO_ERROR"));
      });
    }
    queueMicrotask(() => {
      callback();
    });
  }

  protected _close(callback: (err?: Error | null) => void = () => {}): void {
    // AsyncStorage does not need an explicit close call..
    queueMicrotask(() => {
      callback();
    });
  }

  protected _get(
    key: string,
    options: any,
    callback?: (err: Error | null, value?: ValueType) => void
  ): void | Promise<ValueType> {
    if (callback) {
      this.storage.getItem(`${this.location}/${key}`).then((value) => {
        if (value === null || value === undefined) {
          queueMicrotask(() => {
            callback(new LevelError(`Key ${key} not found`, "LEVEL_NOT_FOUND"));
          });
        } else {
          queueMicrotask(() => {
            callback(null, value);
          });
        }
      });
    } else {
      return new Promise<ValueType>((resolve, reject) => {
        this.storage.getItem(`${this.location}/${key}`).then((value) => {
          if (value === null || value === undefined) {
            reject(new LevelError(`Key ${key} not found`, "LEVEL_NOT_FOUND"));
          } else {
            resolve(value);
          }
        });
      });
    }
  }

  public _getAllKeys(
    callback?: (err: Error | null, keys?: string[]) => void
  ): void | Promise<string[]> {
    if (callback) {
      this.storage
        .getAllKeys()
        .then((keys) =>
          queueMicrotask(() => {
            callback(
              null,
              keys
                .filter((key) => key.startsWith(this.location))
                .map((key) => key.replace(`${this.location}/`, ""))
            );
          })
        )
        .catch((err) =>
          queueMicrotask(() => {
            callback(err);
          })
        );
    } else {
      return new Promise<string[]>((resolve, reject) => {
        this.storage
          .getAllKeys()
          .then((keys) =>
            resolve(
              keys
                .filter((key) => key.startsWith(this.location))
                .map((key) => key.replace(`${this.location}/`, ""))
            )
          )
          .catch((err) => reject(err));
      });
    }
  }

  protected _getMany(
    keys: string[],
    options: any,
    callback: (err: Error | null, value?: ValueType[]) => void
  ): void | Promise<ValueType[]> {
    if (callback) {
      this.storage
        .multiGet(keys.map((key) => `${this.location}/${key}`))
        .then((results) =>
          queueMicrotask(() => {
            callback(
              null,
              results.map(([key, value]) => value)
            );
          })
        )
        .catch((err) =>
          queueMicrotask(() => {
            callback(err);
          })
        );
    } else {
      return new Promise<ValueType[]>((resolve, reject) => {
        this.storage
          .multiGet(keys.map((key) => `${this.location}/${key}`))
          .then((results) => resolve(results.map(([key, value]) => value)))
          .catch((err) => reject(err));
      });
    }
  }

  protected _put(
    key: string,
    value: string,
    options: any,
    callback: (err?: Error | null) => void
  ): void | Promise<void> {
    const valueToString = value.toString();
    if (callback) {
      this.storage
        .setItem(`${this.location}/${key}`, valueToString)
        .then(() =>
          queueMicrotask(() => {
            callback();
          })
        )
        .catch((err) =>
          queueMicrotask(() => {
            callback(new LevelError(err.message, "LEVEL_PUT_ERROR"));
          })
        );
    } else {
      return new Promise<void>((resolve, reject) => {
        this.storage
          .setItem(`${this.location}/${key}`, valueToString)
          .then(() => resolve())
          .catch((err) =>
            reject(new LevelError(err.message, "LEVEL_PUT_ERROR"))
          );
      });
    }
  }

  protected _del(
    key: string,
    options: any,
    callback: (err?: Error | null) => void
  ): void | Promise<void> {
    if (callback) {
      this.storage
        .removeItem(`${this.location}/${key}`)
        .then(() =>
          queueMicrotask(() => {
            callback();
          })
        )
        .catch((err) =>
          queueMicrotask(() => {
            callback(new LevelError(err.message, "LEVEL_DEL_ERROR"));
          })
        );
    } else {
      return new Promise<void>((resolve, reject) => {
        this.storage
          .removeItem(`${this.location}/${key}`)
          .then(() => resolve())
          .catch((err) =>
            reject(new LevelError(err.message, "LEVEL_DEL_ERROR"))
          );
      });
    }
  }

  protected _clear(
    options: any,
    callback: (err?: Error | null) => void
  ): void | Promise<void> {
    if (callback) {
      this.storage
        .getAllKeys()
        .then((keys) => {
          const keysInLocation = keys.filter((key) =>
            key.startsWith(`${this.location}/`)
          );
          return this.storage.multiRemove(keysInLocation);
        })
        .then(() =>
          queueMicrotask(() => {
            callback();
          })
        )
        .catch((err) =>
          queueMicrotask(() => {
            callback(new LevelError(err.message, "LEVEL_DEL_ERROR"));
          })
        );
    } else {
      return new Promise<void>((resolve, reject) => {
        this.storage
          .getAllKeys()
          .then((keys) => {
            const keysInLocation = keys.filter((key) =>
              key.startsWith(`${this.location}/`)
            );
            return this.storage.multiRemove(keysInLocation);
          })
          .then(() => resolve())
          .catch((err) =>
            reject(new LevelError(err.message, "LEVEL_DEL_ERROR"))
          );
      });
    }
  }

  _iterator(options?: any): AsyncStorageIterator {
    return new AsyncStorageIterator(this, options);
  }

  _keys(options?: AbstractKeyIteratorOptions<string>): AsyncStorageKeyIterator {
    return new AsyncStorageKeyIterator(this, options);
  }

  _values(options?: any): AsyncStorageValueIterator {
    return new AsyncStorageValueIterator(this, options);
  }
}

export class AsyncStorageIterator extends AbstractIterator<
  RNAsyncStorageLevel,
  string,
  ValueType
> {
  private keys: string[];

  private currentIndex: number;

  constructor(database: RNAsyncStorageLevel, options: any) {
    super(database, options);
    this.keys = [];
    this.currentIndex = 0;
  }

  // TODO: fix
  // async _next(callback: (err?: Error | null, key?: string, value?: ValueType) => void): Promise<void> {
  //   if (!this.keys.length) {
  //     this.keys = (await this.db._getAllKeys()) as string[]
  //   }
  //   if (this.currentIndex >= this.keys.length) {
  //     callback()
  //     return
  //   }

  //   const key = this.keys[this.currentIndex++]
  //   const value = (await this.db.get(key)) as ValueType
  //   callback(null, key, value)
  // }

  // async _nextv(
  //   size = 0,
  //   options?: any,
  //   callback?: (err: Error | null, entries?: [string, ValueType][]) => void
  // ): Promise<void> {
  //   if (!this.keys.length) {
  //     this.keys = (await this.db._getAllKeys()) as string[]
  //   }
  //   const entries: [string, ValueType][] = []
  //   const endIndex = Math.min(this.currentIndex + size, this.keys.length)
  //   for (; this.currentIndex < endIndex; this.currentIndex++) {
  //     const key = this.keys[this.currentIndex]
  //     const value = (await this.db.get(key)) as ValueType
  //     entries.push([key, value])
  //   }
  //   callback(null, entries)
  // }

  async _all(
    options: any,
    callback: (err: Error | null, entries?: [string, ValueType][]) => void
  ): Promise<void> {
    if (!this.keys.length) {
      this.keys = (await this.db._getAllKeys()) as string[];
    }
    const entries: [string, ValueType][] = [];
    for (; this.currentIndex < this.keys.length; this.currentIndex++) {
      const key = this.keys[this.currentIndex];
      const value = await this.db.get(key);
      entries.push([key, value]);
    }
    queueMicrotask(() => callback(null, entries));
  }

  _close(callback: () => void) {
    this.keys = [];
    this.currentIndex = 0;
    queueMicrotask(() => callback());
  }
}

export class AsyncStorageKeyIterator extends AbstractKeyIterator<
  RNAsyncStorageLevel,
  string
> {
  private keys: string[];

  private currentIndex: number;

  constructor(
    db: RNAsyncStorageLevel,
    options: AbstractKeyIteratorOptions<string>
  ) {
    super(db, options);
    this.keys = [];
    this.currentIndex = 0;
  }

  // TODO: fix
  // async _next(callback: (err?: Error | null, key?: string) => void): Promise<void> {
  //   if (!this.keys.length) {
  //     this.keys = (await this.db._getAllKeys()) as string[]
  //   }
  //   if (this.currentIndex >= this.keys.length) {
  //     queueMicrotask(() => callback())
  //     return
  //   }

  //   const key = this.keys[this.currentIndex++]
  //   queueMicrotask(() => callback(null, key))
  // }

  // async _nextv(size: number, options: any, callback: (err: Error | null, keys?: string[]) => void): Promise<void> {
  //   if (!this.keys.length) {
  //     this.keys = (await this.db._getAllKeys()) as string[]
  //   }
  //   const keys = this.keys.slice(this.currentIndex, this.currentIndex + size)
  //   this.currentIndex += keys.length
  //   queueMicrotask(() => callback(null, keys))
  // }

  async _all(
    options: any,
    callback: (err: Error | null, keys?: string[]) => void
  ): Promise<void> {
    if (!this.keys.length) {
      this.keys = (await this.db._getAllKeys()) as string[];
    }
    const keys = this.keys.slice(this.currentIndex);
    this.currentIndex = this.keys.length;
    queueMicrotask(() => callback(null, keys));
  }

  _close(callback: () => void) {
    this.keys = [];
    this.currentIndex = 0;
    queueMicrotask(() => callback());
  }
}

export class AsyncStorageValueIterator extends AbstractValueIterator<
  RNAsyncStorageLevel,
  string,
  ValueType
> {
  private keys: string[];

  private currentIndex: number;

  constructor(db: RNAsyncStorageLevel, options: any) {
    super(db, options);
    this.keys = [];
    this.currentIndex = 0;
  }
  // TODO: fix
  // async _next(callback: (err?: Error | null, value?: ValueType) => void): Promise<void> {
  //   if (!this.keys.length) {
  //     this.keys = (await this.db._getAllKeys()) as string[]
  //   }
  //   if (this.currentIndex >= this.keys.length) {
  //     queueMicrotask(() => callback())
  //     return
  //   }
  //   const key = this.keys[this.currentIndex++]
  //   const value = (await this.db.get(key)) as ValueType
  //   queueMicrotask(() => callback(null, value))
  // }

  // async _nextv(size: number, options: any, callback: (err: Error | null, values?: ValueType[]) => void): Promise<void> {
  //   if (!this.keys.length) {
  //     this.keys = (await this.db._getAllKeys()) as string[]
  //   }
  //   const endIndex = Math.min(this.currentIndex + size, this.keys.length)
  //   const fetchPromises = this.keys.slice(this.currentIndex, endIndex).map((key) => this.db.get(key))
  //   const values = await Promise.all(fetchPromises)
  //   this.currentIndex = endIndex
  //   queueMicrotask(() => callback(null, values))
  // }

  async _all(
    options: any,
    callback: (err: Error | null, values?: ValueType[]) => void
  ): Promise<void> {
    if (!this.keys.length) {
      this.keys = (await this.db._getAllKeys()) as string[];
    }
    const fetchPromises = this.keys
      .slice(this.currentIndex, this.keys.length)
      .map((key) => this.db.get(key));
    const values = await Promise.all(fetchPromises);
    this.currentIndex = this.keys.length;
    queueMicrotask(() => callback(null, values));
  }

  _close(callback: () => void) {
    this.keys = [];
    this.currentIndex = 0;
    queueMicrotask(() => callback());
  }
}

export * from "./level-factory";
