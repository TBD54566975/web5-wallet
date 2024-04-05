"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpoLevelIterator = exports.ExpoLevel = void 0;
var _abstractLevel = require("abstract-level");
var _reactNativeLeveldb = require("react-native-leveldb");
var _moduleError = _interopRequireDefault(require("module-error"));
var fs = _interopRequireWildcard(require("expo-file-system"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ExpoLevelIterator extends _abstractLevel.AbstractIterator {
  valid = true;
  startingBoundIsOpen = false;
  endingBoundIsOpen = false;
  stepCount = 0;
  busy = false;
  startedReading = false;
  constructor(db, options) {
    super(db, options);
    const level = this.db._db;
    // console.log('iterator options was', options);
    this.it = level.newIterator();
    this.options = options;
    this.hasLimit = options.limit != undefined && options.limit != -1;
    this.isReversed = options.reverse || false;
    this.readsKeys = options.keys != undefined ? options.keys : true;
    this.readsValues = options.values != undefined ? options.values : true;
    let lowerBound;
    let upperBound;
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
        if (!(this.isReversed ? upperBoundIsOpen : lowerBoundIsOpen) && comparison == 0 || this.isReversed && comparison > 0) {
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
  async *[Symbol.iterator]() {
    try {
      let item;
      while ((item = await this.next()) !== undefined) {
        yield item;
      }
    } finally {
      if (this.valid) await this.close();
    }
  }
  current() {
    if (this.isEnded()) {
      return undefined;
    }
    let key = this.readsKeys ? this.it.keyBuf() : undefined;
    let val = this.readsValues ? this.it.valueBuf() : undefined;
    return [key, val];
  }

  // An empty array signifies the natural end of the iterator
  // so simply yielding a non-empty array signifies non-end
  _next(callback) {
    if (this.busy) {
      callback(new _moduleError.default("Iterator is busy", {
        code: "LEVEL_ITERATOR_BUSY"
      }));
      return;
    } else if (!this.valid) {
      callback(new _moduleError.default("Iterator is not open", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
      return;
    }
    // need to set busy to pass compliance
    this.busy = true;
    try {
      let gotKey;
      let gotValue;
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
  _seek(target, options) {
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
  _close(callback) {
    if (!this.valid) return;
    this.valid = false;
    this.it.close();
    this.db._openIterators.delete(this);
    this.db.nextTick(callback);
  }
  isEnded() {
    // following https://github.com/andymatuschak/react-native-leveldown/blob/e7d14cfdf81558d15ecec76e956269081d12a40b/ios/RNLeveldown.mm#L162
    if (!this.it.valid()) {
      return true;
    }
    if (this.hasLimit && this.stepCount >= this.limit) {
      return true;
    }
    if (this.endingBound != undefined) {
      const comparison = this.it.compareKey(toBuffer(this.endingBound));
      if (comparison < 0 && this.isReversed || comparison > 0 && !this.isReversed || comparison == 0 && !this.endingBoundIsOpen) {
        return true;
      }
    }
    if (this.startingBound != undefined) {
      const comparison = this.it.compareKey(toBuffer(this.startingBound));
      if (comparison > 0 && this.isReversed || comparison < 0 && !this.isReversed || comparison == 0 && !this.startingBoundIsOpen) {
        return true;
      }
    }
    return false;
  }
}
exports.ExpoLevelIterator = ExpoLevelIterator;
class ExpoLevel extends _abstractLevel.AbstractLevel {
  _openIterators = new Set();
  constructor(location, options) {
    super({
      encodings: {
        view: true
      },
      seek: true,
      streams: false,
      createIfMissing: true,
      errorIfExists: true,
      permanence: true,
      snapshots: false
    }, options);
    this.location = location;
  }
  async _open(options, callback) {
    const {
      createIfMissing = true,
      errorIfExists = false
    } = options;
    try {
      if (errorIfExists) {
        // sometimes the LevelDB cannot report error for errorIfExists
        const realLocation = fs.documentDirectory + this.location;
        const info = await fs.getInfoAsync(realLocation);
        if (info.exists) {
          throw {
            message: "File already exists"
          };
        }
      }
      this._db = new _reactNativeLeveldb.LevelDB(this.location, createIfMissing, errorIfExists);
      this.nextTick(callback, null);
    } catch (e) {
      const msg = e.message;
      if (msg.includes("does not exist")) {
        const err = new _moduleError.default(msg, {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
        // console.log('msg has does not exist');
        this.nextTick(callback, err);
      } else if (msg.includes("exists")) {
        const err = new _moduleError.default(msg, {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
        // console.log('msg has already exists');
        this.nextTick(callback, err);
        // this.nextTick(callback, e);
      } else {
        console.log("open error", "type", typeof e, e.code, e.message);
        throw e;
      }
    }
  }
  _close(callback) {
    try {
      if (this._openIterators.size) {
        for (const it of this._openIterators) {
          it.valid = false;
          it.it.close();
        }
      }
      if (!this._db.closed) {
        this._db.close();
      }
      this.nextTick(callback, null);
    } catch (e) {
      this.nextTick(callback, e);
    }
  }
  _get(key, options, callback) {
    this.nextTick(() => {
      try {
        const value = this._db.getBuf(toBuffer(key));
        if (value === null) {
          // not found
          callback(new _moduleError.default(`Key ${key} was not found`, {
            code: "LEVEL_NOT_FOUND"
          }));
          return;
        }
        callback(null, fromBuffer(value));
      } catch (e) {
        callback(error(e));
      }
    });
  }
  _getMany(keys, options, callback) {
    this.nextTick(() => {
      try {
        const values = keys.map(key => {
          const value = this._db.getBuf(toBuffer(key));
          if (value === null) {
            // not found
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
  _put(key, value, options, callback) {
    this.nextTick(() => {
      try {
        this._db.put(toBuffer(key), toBuffer(value));
        callback(undefined);
      } catch (e) {
        callback(error(e));
      }
    });
  }
  _del(key, options, callback) {
    this.nextTick(() => {
      try {
        this._db.delete(toBuffer(key));
        callback(undefined);
      } catch (e) {
        callback(error(e));
      }
    });
  }
  _batch(operations, options, callback) {
    // TODO: Maybe see if we can add batch to actual react-native-leveldb?
    // Or just doing this is enough...

    this.nextTick(() => {
      try {
        for (const operation of operations) {
          switch (operation.type) {
            case "put":
              this._db.put(toBuffer(operation.key), toBuffer(operation.value));
              break;
            case "del":
              this._db.delete(toBuffer(operation.key));
              break;
          }
        }
        callback(undefined);
      } catch (e) {
        callback(error(e));
      }
    });
  }
  _iterator(options) {
    const it = new ExpoLevelIterator(this, options);
    this._openIterators.add(it);
    return it;
  }

  // Hopefully can do this better later with native implementaion?
  _clear(options, callback) {
    const _clear_inner = async () => {
      const it = this.iterator({
        ...options,
        values: false
      });
      try {
        const keys = [];
        while (true) {
          const kv = await it.next();
          if (!kv) {
            break;
          }
          keys.push(kv[0]);
        }
        for (const k of keys) {
          this._db.delete(toBuffer(k));
        }
      } finally {
        await it.close();
      }
    };
    _clear_inner().then(() => {
      callback(undefined);
    }).catch(e => {
      callback(error(e));
    });
  }
}
exports.ExpoLevel = ExpoLevel;
function error(e) {
  if (e instanceof Error) {
    return e;
  }
  return new Error(`${e}`);
}
function toBuffer(array) {
  return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
}
function fromBuffer(buf) {
  return new Uint8Array(buf);
}
//# sourceMappingURL=level.js.map