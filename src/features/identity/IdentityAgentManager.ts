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

  // WARN: EVERYTHING BELOW THIS POINT TEST CODE. DON'T PR IT!
  // IF IT ENDS UP IN A PR, PLEASE REJECT THE PR!

  // Check if it's the first launch.
  const isFirstLaunch = await agent.firstLaunch();
  console.log("isFirstLaunch:", isFirstLaunch);

  // Start the agent with a hard-coded passphrase
  await agent.start({ passphrase: "passphrase" });

  // List number of identities
  const managedProfiles1 = await agent.identityManager.list();
  console.log("managedProfiles count before:", managedProfiles1.length);

  // Create a brand new identity
  const identity = await agent.identityManager.create({
    name: `Test Profile ${managedProfiles1.length}`,
    didMethod: "ion",
    kms: "local",
  });
  console.log(`Created ${identity.name} ManagedIdentity: ${identity.did}`);

  // List number of identities a second time, it should be 1 more than it was before as we just made one.
  const managedProfiles2 = await agent.identityManager.list();
  console.log("managedProfiles count after:", managedProfiles2.length);
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
