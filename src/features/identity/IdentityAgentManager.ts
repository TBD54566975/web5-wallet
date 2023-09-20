import { IdentityAgent } from "@web5/identity-agent";
import {
  type CreateDidMethodOptions,
  AppDataVault,
  DwnManager,
  SyncManagerLevel,
} from "@web5/agent";
import {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} from "@tbd54566975/dwn-sdk-js/stores";
import { type Level } from "level";
import { Dwn } from "@tbd54566975/dwn-sdk-js";
import { AbstractDatabaseOptions } from "abstract-level";
import { ExpoLevel } from "expo-level";
import { ExpoLevelStore } from "@/features/identity/expo-level-store";
import ms from "ms";

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

  const syncManager = new SyncManagerLevel({
    db: new ExpoLevel("SyncStore") as Level,
  });

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

const isFirstLaunch = async () => {
  return await agent.firstLaunch();
};

const startAgent = async (passphrase: string) => {
  await agent.start({ passphrase });
  await startSync();
};

const startSync = async () => {
  // Register all DIDs under management, as well as the agent's master DID
  const managedIdentities = await agent.identityManager.list();
  const didsToRegister = [
    agent.agentDid,
    ...managedIdentities.map((i) => i.did),
  ];

  await Promise.all(
    didsToRegister.map((did) => agent.syncManager.registerIdentity({ did }))
  );

  // TODO: Once selective sync is enabled, only sync for records that the mobile identity agent
  // cares about. We DO NOT want to sync every record the user has in their DWN to their mobile device.
  agent.syncManager.startSync({ interval: ms("2m") }).catch((error: any) => {
    console.error(`Sync failed: ${error}`);
  });
};

const createIdentity = async (
  name: string,
  didMethod: keyof CreateDidMethodOptions = "ion",
  kms = "local"
) => {
  const identity = await agent.identityManager.create({
    name,
    didMethod,
    kms,
  });

  // Import the identity that was just created, using the agent's DID as the context,
  // so that the agent can access that identity.
  await agent.identityManager.import({
    identity,
    context: agent.agentDid,
  });
};

const listIdentities = () => {
  return agent.identityManager.list();
};

export const IdentityAgentManager = {
  initAgent,
  isFirstLaunch,
  startAgent,
  createIdentity,
  listIdentities,
};
