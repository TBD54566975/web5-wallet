import { LevelDB } from "react-native-leveldb";
// import type { BatchOperation } from "classic-level";

type Callback<T> = (
  err: Error | undefined | null,
  result?: T | undefined
) => void;

/**
 * not even close to abstract level. just trying to get the thing to run.
 *
 * TODO: fix typedefs. remove anys.
 */
export class RNLevel extends LevelDB {
  // private db: typeof LevelDB;

  constructor(name: string) {
    super(name, true, false);
  }

  // NOOP because we don't delegate open on mobile
  open() {}

  /**
   * same as using del or put individually but batches them up. to me this seems unnecessary but we use it.
   *
   * @param operations an array of either "type" del or put operations
   */
  batch(operations: Array<any>) {
    for (const operation of operations) {
      operation.type === "del"
        ? super.delete(operation.key)
        : super.put(operation.key, operation.value);
    }
  }

  /**
   *
   * @param {string} key to get from storage
   * @param {Function} callback called with the key you get from storage
   */
  get(key: string, callback?: Callback<string>) {
    // satisfy types
    const result = super.getStr(key) ?? undefined;

    if (callback) callback(null, result);

    return result;
  }
}
