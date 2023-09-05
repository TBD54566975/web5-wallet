import type { KeyValueStore } from "@web5/common";
import { ExpoLevel } from "expo-level";

export class ExpoLevelStore implements KeyValueStore<string, any> {
  private store: ExpoLevel<string, string>;

  constructor(location = "DATASTORE") {
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
    return await this.store.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.store.put(key, value);
  }
}
