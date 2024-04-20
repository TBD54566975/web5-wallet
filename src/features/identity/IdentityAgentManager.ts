import { Web5IdentityAgent } from "@web5/identity-agent";
import {
  AgentDidApi,
  AgentSyncApi,
  HdIdentityVault,
  SyncEngineLevel,
  AgentDwnApi,
  DwnDidStore,
} from "@web5/agent";
import {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} from "@tbd54566975/dwn-sdk-js";
import { getTechPreviewDwnEndpoints, Web5 } from "@web5/api";
import {
  profileProtocol,
  type ProfileProtocol,
} from "../profile/protocol/profile-protocol";
import { DidDht, DidJwk, DidResolverCacheLevel } from "@web5/dids";
import { LevelKeyValueStore } from "../app/expo-level-store";
import { ReactNativeLevelDBAsync } from "@shamilovtim/react-native-leveldb-async";

// Singleton
let agent: Web5IdentityAgent;
let isStarted = false;

const initAgent = async () => {
  if (agent) {
    console.warn(
      "IdentityAgent.create was called, but the agent is already initialized. This has been no-oped."
    );
    return;
  }

  const agentVault = new HdIdentityVault({
    keyDerivationWorkFactor: 210_000,
    store: new LevelKeyValueStore("DWN_IDENTITYVAULT"),
  });

  const didApi = new AgentDidApi({
    didMethods: [DidDht, DidJwk],
    // resolverCache: new DidResolverCacheMemory(),
    resolverCache: new DidResolverCacheLevel({
      db: new ReactNativeLevelDBAsync("DWN_RESOLVERCACHE"),
    }),
    store: new DwnDidStore(),
  });

  const syncEngine = new SyncEngineLevel({
    db: new ReactNativeLevelDBAsync("DWN_SYNCSTORE"),
  });

  const syncApi = new AgentSyncApi({ syncEngine });

  const dwnApi = new AgentDwnApi({
    dwn: await AgentDwnApi.createDwn({
      dataPath: "AGENT",
      didResolver: didApi,
      dataStore: new DataStoreLevel({
        blockstoreLocation: "DWN_DATASTORE",
        createLevelDatabase: (location, options?) =>
          Promise.resolve(new ReactNativeLevelDBAsync(location, options)),
      }),
      messageStore: new MessageStoreLevel({
        blockstoreLocation: "DWN_MESSAGESTORE",
        indexLocation: "DWN_MESSAGEINDEX",
        createLevelDatabase: (location, options?) =>
          Promise.resolve(new ReactNativeLevelDBAsync(location, options)),
      }),
      eventLog: new EventLogLevel({
        location: "DWN_EVENTLOG",
        createLevelDatabase: (location, options?) =>
          Promise.resolve(new ReactNativeLevelDBAsync(location, options)),
      }),
    }),
  });

  agent = await Web5IdentityAgent.create({
    dwnApi,
    didApi,
    agentVault,
    syncApi,
  });
};

const isFirstLaunch = async () => {
  return await agent.firstLaunch();
};

const isAgentStarted = () => {
  return isStarted;
};

const startAgent = async (password: string) => {
  await agent.start({ password });
  await startSync();
  isStarted = true;
};

const startSync = async () => {
  // Register all DIDs under management, as well as the agent's master DID
  const managedIdentities = await agent.identity.list();
  const didsToRegister = [
    agent.agentDid,
    ...managedIdentities.map((i) => i.did),
  ];

  await Promise.all(
    didsToRegister.map((did) => agent.sync.registerIdentity({ did: did.uri }))
  );

  // TODO: Once selective sync is enabled, only sync for records that the mobile identity agent
  // cares about. We DO NOT want to sync every record the user has in their DWN to their mobile device.
  agent.sync.startSync({ interval: String(120_000) }).catch((error) => {
    console.error(`Sync failed: ${error}`);
  });
};

const createIdentity = async (name: string, displayName: string) => {
  const serviceEndpointNodes = await getTechPreviewDwnEndpoints();

  // Generate a new Identity for the end-user.

  const identity = await agent.identity.create({
    didMethod: "dht",
    metadata: { name },
    didOptions: {
      services: [
        {
          id: "dwn",
          type: "DecentralizedWebNode",
          serviceEndpoint: serviceEndpointNodes,
          enc: "#enc",
          sig: "#sig",
        },
      ],
      verificationMethods: [
        {
          algorithm: "Ed25519",
          id: "sig",
          purposes: ["assertionMethod", "authentication"],
        },
        {
          algorithm: "secp256k1",
          id: "enc",
          purposes: ["keyAgreement"],
        },
      ],
    },
  });

  await agent.identity.manage({ portableIdentity: await identity.export() });

  // Install the profile protocol in the DWN, for the newly created identity tenant
  const web5 = new Web5({ agent, connectedDid: identity.did.uri });
  await web5.dwn.protocols.configure({
    message: {
      definition: profileProtocol,
    },
  });

  // Write the profile
  const profile: ProfileProtocol = {
    did: identity.did.uri,
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

  // Register the new identity with syncManager so that all records associated
  // with it (including the profile) get synced to the remote DWN servers.
  await agent.sync.registerIdentity({ did: identity.did.uri });
};

const listIdentities = () => {
  return agent.identity.list();
};

const web5 = (didUri: string): Web5 => {
  return new Web5({ agent, connectedDid: didUri });
};

const initialize = async (password: string) => {
  await agent.initialize({ password });
  await startAgent(password);
};

export const IdentityAgentManager = {
  initAgent,
  initialize,
  isFirstLaunch,
  isAgentStarted,
  startAgent,
  createIdentity,
  listIdentities,
  web5,
};
