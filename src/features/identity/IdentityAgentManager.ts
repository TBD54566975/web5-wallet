import { IdentityAgent } from "@web5/identity-agent";
import {
  type CreateDidMethodOptions,
  type ManagedIdentity,
  AppDataVault,
  DwnManager,
} from "@web5/agent";
import { Web5 } from "@web5/api";
import {
  profileProtocol,
  Profile,
} from "@/features/dwn/profile-protocol/profile-protocol";
import {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} from "@tbd54566975/dwn-sdk-js/stores";
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

const isFirstLaunch = async () => {
  return await agent.firstLaunch();
};

const startAgent = async (passphrase: string) => {
  return await agent.start({ passphrase });
};

const createIdentity = async (
  name: string,
  displayName: string,
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

  // Install the profile protocol in the DWN, for the newly created identity tenant
  const web5 = new Web5({ agent, connectedDid: identity.did });
  await web5.dwn.protocols.configure({
    message: {
      definition: profileProtocol,
    },
  });

  // Write a profile
  const profile: Profile = {
    displayName,
  };
  await web5.dwn.records.write({
    data: profile,
    message: {
      schema: profileProtocol.types.profile.schema,
      protocol: profileProtocol.protocol,
      protocolPath: "profile",
    },
    store: true,
  });
};

const listIdentities = () => {
  return agent.identityManager.list();
};

const web5 = (identity: ManagedIdentity): Web5 => {
  return new Web5({ agent, connectedDid: identity.did });
};

export const IdentityAgentManager = {
  initAgent,
  isFirstLaunch,
  startAgent,
  createIdentity,
  listIdentities,
  web5,
};
