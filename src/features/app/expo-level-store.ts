import type { KeyValueStore } from "@web5/common";
import { ExpoLevel } from "expo-level";

export class ExpoLevelStore implements KeyValueStore<string, any> {
  private store: ExpoLevel<string, string>;

  constructor(location: string) {
    this.store = new ExpoLevel(location);
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
