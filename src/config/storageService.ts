import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

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

const setString = storage.set;
const getString = storage.getString;

export const StorageService = {
  setObjectOrArray,
  setString,
  getString,
  getObjectOrArray,
};
