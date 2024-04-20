import type { KeyValueStore } from "@web5/common";
import { ReactNativeLevelDBAsync } from "@shamilovtim/react-native-leveldb-async";

export class LevelKeyValueStore implements KeyValueStore<string, any> {
  private store: ReactNativeLevelDBAsync<string, string>;

  constructor(location: string) {
    this.store = new ReactNativeLevelDBAsync(location);
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }

  async close(): Promise<void> {
    await this.store.close();
  }

  async delete(key: string): Promise<boolean> {
    await this.store.del(key);
    return true;
  }

  async get(key: string): Promise<any> {
    try {
      return await this.store.get(key);
    } catch (error: any) {
      // Don't throw when a key wasn't found.
      if (error.notFound) return undefined;
      throw error;
    }
  }

  async set(key: string, value: any): Promise<void> {
    await this.store.put(key, value);
  }
}
