import { IdentityAgent } from "@web5/identity-agent";
import { AppDataVault, DwnManager } from "@web5/agent";
import {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} from "@tbd54566975/dwn-sdk-js/dist/esm/src/index-stores";
import { Dwn } from "@tbd54566975/dwn-sdk-js";
import { AbstractDatabaseOptions } from "abstract-level";
import { ExpoLevel } from "expo-level";
import { ExpoLevelStore } from "@/features/identity/expo-level-store";
import { NoOpSyncManager } from "@/features/identity/no-op-sync-manager";

// Singleton
let agent: IdentityAgent;

const initAgent = async () => {
  if (agent) {
    console.warn(
      "initAgent was called, but the agent is already initialized. This has been no-oped."
    );
    return;
  }
  const dwn = await createDwn();
  const dwnManager = new DwnManager({ dwn });
  const appData = new AppDataVault({
    keyDerivationWorkFactor: 1,
    store: new ExpoLevelStore("AppDataVault"),
  });

  const syncManager = new NoOpSyncManager();

  agent = await IdentityAgent.create({ dwnManager, appData, syncManager });
};

const createDwn = async (): Promise<Dwn> => {
  const messageStore = new MessageStoreLevel({
    createLevelDatabase: createExpoLevelDatabase,
  });

  const dataStore = new DataStoreLevel({
    createLevelDatabase: createExpoLevelDatabase,
  });

  const eventLog = new EventLogLevel({
    createLevelDatabase: createExpoLevelDatabase,
  });

  return await Dwn.create({
    messageStore,
    dataStore,
    eventLog,
  });
};

const createExpoLevelDatabase = (
  location: string,
  options?: AbstractDatabaseOptions<unknown, unknown>
): ExpoLevel<unknown, unknown> => {
  return new ExpoLevel(location, options);
};

const getAgent = () => {
  return agent;
};

export const IdentityAgentManager = {
  initAgent,
  getAgent,
};
