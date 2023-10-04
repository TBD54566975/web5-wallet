import {
  Dwn,
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} from "@tbd54566975/dwn-sdk-js";
import { AbstractDatabaseOptions } from "abstract-level";
import { type Level } from "level";
import { ExpoLevel } from "expo-level";

export const createDwn = async () => {
  const messageStore = new MessageStoreLevel({
    createLevelDatabase: createExpoLevelDatabase,
  });

  const dataStore = new DataStoreLevel({
    createLevelDatabase: createExpoLevelDatabase,
  });

  const eventLog = new EventLogLevel({
    location: "EVENTLOG",
    createLevelDatabase: createExpoLevelDatabase,
  });

  return await Dwn.create({
    messageStore,
    dataStore,
    eventLog,
  });
};

const createExpoLevelDatabase = <V>(
  location: string,
  options?: AbstractDatabaseOptions<string, V>
) => {
  const db = new ExpoLevel(location, options);
  return Promise.resolve(db as Level<string, V>);
};
