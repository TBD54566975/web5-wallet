import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

const setObjectOrArray = (
  key: string,
  object: Record<string, unknown> | Array<unknown>
) => {
  try {
    const objectAsString = JSON.stringify(object);
    storage.set(key, objectAsString);
  } catch (e) {
    console.warn("Unable to stringify object or array: ", e.message);
  }
};

const getObjectOrArray = <T>(key: string) => {
  try {
    const objectAsString = storage.getString(key);

    if (objectAsString) {
      return JSON.parse(objectAsString) as T;
    }
  } catch (e) {
    console.warn("Unable to parse object or array: ", e.message);
    return undefined;
  }
};

const setString = (key: string, params: string) => {
  storage.set(key, params);
};

const getString = (key: string) => {
  return storage.getString(key);
};

const setNumber = (key: string, params: number) => {
  storage.set(key, params);
};

const getNumber = (key: string) => {
  return storage.getString(key);
};

const setBuffer = (key: string, params: Uint8Array) => {
  storage.set(key, params);
};

const getBuffer = (key: string) => {
  return storage.getBuffer(key);
};

export const StorageService = {
  setString,
  getString,
  getNumber,
  setNumber,
  setObjectOrArray,
  getObjectOrArray,
  getBuffer,
  setBuffer,
};
