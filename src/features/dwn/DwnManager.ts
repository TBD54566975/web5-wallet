import {
  Dwn,
  RecordsWrite,
  DataStream,
  DidKeyResolver,
  RecordsQuery,
} from "@tbd54566975/dwn-sdk-js";
import { MemoryLevel } from "memory-level";
import {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} from "@tbd54566975/dwn-sdk-js/dist/esm/src/index-stores";
import { AbstractDatabaseOptions } from "abstract-level";
import { ExpoLevel } from "expo-level";

// singleton
let dwn: Dwn;

// TODO: figure out which dwn urls we want to use. i imagine we want to use current host
const initExpoLevelDwn = async () => {
  if (!dwn) {
    const messageStore = new MessageStoreLevel({
      createLevelDatabase: createExpoLevelDatabase,
    });

    const dataStore = new DataStoreLevel({
      createLevelDatabase: createExpoLevelDatabase,
    });

    const eventLog = new EventLogLevel({
      createLevelDatabase: createExpoLevelDatabase,
    });

    dwn = await Dwn.create({
      messageStore,
      dataStore,
      eventLog,
    });

    console.info("RN-Level DWN initialized");

    await checkDwnStatus();

    return dwn;
  }

  console.warn(
    "initDwn was called but the dwn was already initialized. This has been no-oped so it's harmless. But check your code and make sure you aren't running initialization twice."
  );

  return dwn;
};

const createExpoLevelDatabase = (
  location: string,
  options?: AbstractDatabaseOptions<unknown, unknown>
): ExpoLevel<unknown, unknown> => {
  return new ExpoLevel(location, options);
};

const initMemoryDwn = async () => {
  if (!dwn) {
    const messageStore = new MessageStoreLevel({
      createLevelDatabase: (_, options?: any) =>
        Promise.resolve(new MemoryLevel(options)),
    });

    const dataStore = new DataStoreLevel({
      createLevelDatabase: (_, options?) =>
        Promise.resolve(new MemoryLevel(options)),
    });

    const eventLog = new EventLogLevel({
      createLevelDatabase: (_, options?) =>
        Promise.resolve(new MemoryLevel(options)),
      location: "EVENTLOG",
    });

    dwn = await Dwn.create({ messageStore, dataStore, eventLog });

    console.info("Memory-Level DWN initialized");

    await checkDwnStatus();

    return dwn;
  }

  console.warn(
    "initDwn was called but the dwn was already initialized. This has been no-oped so it's harmless. But check your code and make sure you aren't running initialization twice."
  );

  return dwn;
};

const checkDwnStatus = async () => {
  const { did, keyPair } = await DidKeyResolver.generate();
  const privateJwk = keyPair.privateJwk;
  const data = new TextEncoder().encode("data1");
  //* reference. kid is something like: `${longURI}#key-1`;
  const kid = DidKeyResolver.getKeyId(did);
  const dataStream = DataStream.fromBytes(data);

  const record = await RecordsWrite.create({
    schema: "test",
    data: data,
    dataFormat: "application/json",
    authorizationSignatureInput: {
      privateJwk: privateJwk,
      protectedHeader: { alg: "EdDSA", kid: kid },
    },
  });

  console.info("Checking RecordsWrite result:");
  const writeResult = await dwn.processMessage(did, record.message, dataStream);
  console.info(JSON.stringify(writeResult));

  const query = await RecordsQuery.create({
    filter: {
      schema: "test",
    },
    authorizationSignatureInput: {
      privateJwk: privateJwk,
      protectedHeader: { alg: "EdDSA", kid: kid },
    },
  });

  console.info("Checking RecordsQuery result:");
  const queryResult = await dwn.processMessage(did, query.message);
  console.info(JSON.stringify(queryResult));
};

const getDwn = () => {
  return dwn;
};

export const DwnManger = {
  initExpoLevelDwn,
  initMemoryDwn,
  checkDwnStatus,
  getDwn,
};
