import { AbstractBatchOperation, AbstractBatchOptions, AbstractClearOptions, AbstractDatabaseOptions, AbstractDelOptions, AbstractGetManyOptions, AbstractGetOptions, AbstractIterator, AbstractIteratorOptions, AbstractLevel, AbstractOpenOptions, AbstractPutOptions, AbstractSeekOptions, NodeCallback } from "abstract-level";
import { LevelDB, LevelDBIterator } from "react-native-leveldb";
import type { NextCallback } from "abstract-level/types/abstract-iterator";
export declare class ExpoLevelIterator<K, V> extends AbstractIterator<ExpoLevel<K, V>, Uint8Array, Uint8Array> {
    it: LevelDBIterator;
    valid: boolean;
    options: AbstractIteratorOptions<Uint8Array, Uint8Array>;
    hasLimit: boolean;
    isReversed: boolean;
    readsKeys: boolean;
    readsValues: boolean;
    startingBoundIsOpen: boolean;
    endingBoundIsOpen: boolean;
    stepCount: number;
    startingBound?: Uint8Array;
    endingBound?: Uint8Array;
    busy: boolean;
    startedReading: boolean;
    constructor(db: any, options: AbstractIteratorOptions<Uint8Array, Uint8Array>);
    [Symbol.iterator](): AsyncGenerator<[Uint8Array, Uint8Array], void, unknown>;
    current(): [ArrayBuffer | undefined, ArrayBuffer | undefined] | undefined;
    protected _next(callback: NextCallback<Uint8Array, Uint8Array>): void;
    protected _seek(target: Uint8Array, options: AbstractSeekOptions<Uint8Array>): void;
    protected _close(callback: NodeCallback<void>): void;
    protected isEnded(): boolean;
}
export declare class ExpoLevel<K, V> extends AbstractLevel<Uint8Array | string, K, V> {
    _db?: LevelDB;
    location: string;
    _openIterators: Set<ExpoLevelIterator<K, V>>;
    constructor(location: string, options?: AbstractDatabaseOptions<K, V> | undefined);
    protected _open(options: AbstractOpenOptions, callback: NodeCallback<void>): Promise<void>;
    protected _close(callback: NodeCallback<void>): void;
    protected _get(key: Uint8Array, options: AbstractGetOptions<K, V>, callback: NodeCallback<Uint8Array>): void;
    protected _getMany(keys: Uint8Array[], options: AbstractGetManyOptions<K, V>, callback: NodeCallback<(Uint8Array | undefined)[]>): void;
    protected _put(key: Uint8Array, value: Uint8Array, options: AbstractPutOptions<K, V>, callback: NodeCallback<void>): void;
    protected _del(key: Uint8Array, options: AbstractDelOptions<K>, callback: NodeCallback<void>): void;
    protected _batch(operations: Array<AbstractBatchOperation<unknown, Uint8Array, Uint8Array>>, options: AbstractBatchOptions<K, V>, callback: NodeCallback<void>): void;
    protected _iterator(options: AbstractIteratorOptions<Uint8Array, Uint8Array>): ExpoLevelIterator<K, V>;
    _clear(options: AbstractClearOptions<K>, callback: NodeCallback<void>): void;
}
//# sourceMappingURL=level.d.ts.map