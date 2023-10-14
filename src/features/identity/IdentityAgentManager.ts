import { IdentityAgent } from "@web5/identity-agent";
import {
  type CreateDidMethodOptions,
  type ManagedIdentity,
  AppDataVault,
  DwnManager,
  SyncManagerLevel,
} from "@web5/agent";
import { getTechPreviewDwnEndpoints, Web5 } from "@web5/api";
import { DidIonMethod, type DidIonCreateOptions } from "@web5/dids";
import {
  profileProtocol,
  type ProfileProtocol,
} from "@/features/profile/protocol/profile-protocol";
import { type Level } from "level";
import { ExpoLevel } from "expo-level";
import { ExpoLevelStore } from "@/features/app/expo-level-store";
import ms from "ms";
import { createDwn } from "@/features/dwn/dwn";

// Singleton
let agent: IdentityAgent;
let isStarted = false;

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

const isFirstLaunch = async () => {
  return await agent.firstLaunch();
};

const isAgentStarted = () => {
  return isStarted;
};

const startAgent = async (passphrase: string) => {
  await agent.start({ passphrase });
  await startSync();
  isStarted = true;
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
  displayName: string,
  didMethod: keyof CreateDidMethodOptions = "ion",
  kms = "local"
) => {
  let didOptions: DidIonCreateOptions | undefined;
  if (didMethod === "ion") {
    const serviceEndpointNodes = await getTechPreviewDwnEndpoints();
    didOptions = await DidIonMethod.generateDwnOptions({
      serviceEndpointNodes,
    });
  }

  const identity = await agent.identityManager.create({
    name,
    didMethod,
    didOptions,
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
  const profile: ProfileProtocol = {
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
  await agent.syncManager.registerIdentity({ did: identity.did });
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
  isAgentStarted,
  startAgent,
  createIdentity,
  listIdentities,
  web5,
};
