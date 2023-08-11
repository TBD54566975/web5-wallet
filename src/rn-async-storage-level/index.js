import { LevelFactory, RNAsyncStorageLevel } from "./RNAsyncStorageLevel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Level(location, options) {
  const store = LevelFactory.createAbstractLevel(
    RNAsyncStorageLevel,
    location,
    options
  );
  if (store instanceof RNAsyncStorageLevel) {
    store.setStorage(AsyncStorage);
  }
  return store;
}
