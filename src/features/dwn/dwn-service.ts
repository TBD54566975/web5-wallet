import {
  Dwn,
  MessageStoreLevel,
  DataStoreLevel,
  Jws,
  RecordsQuery,
  RecordsWrite,
  DataStream,
  DidKeyResolver,
} from "@tbd54566975/dwn-sdk-js";
import { RNLevel } from "./rn-level";

let dwn: Dwn;

async function initDwn() {
  if (!dwn) {
    dwn = await Dwn.create({
      messageStore: new MessageStoreLevel({
        createLevelDatabase: () => new RNLevel("messageStore") as any,
      }),
      dataStore: new DataStoreLevel({
        createLevelDatabase: () => new RNLevel("dataStore") as any,
      }),
    });
    return dwn;
  }

  console.warn(
    "Init dwn was called but the dwn was already initialized. check your code and make sure you aren't running initialization twice."
  );

  return dwn;
}

function getDwn() {
  return dwn;
}

export const DwnService = {
  initDwn,
  getDwn,
};
