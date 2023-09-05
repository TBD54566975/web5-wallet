import { IdentityAgent } from "@web5/identity-agent";
import { AppDataVault, DwnManager } from "@web5/agent";
import { ExpoLevelStore } from "./expo-level-store";
import { Dwn } from "@tbd54566975/dwn-sdk-js";

export async function bootstrapIdentityAgent(
  passphrase: string,
  name: string,
  dwn: Dwn
) {
  const dwnManager = new DwnManager({ dwn });
  const appData = new AppDataVault({
    keyDerivationWorkFactor: 1,
    store: new ExpoLevelStore("AppDataVault"),
  });

  console.log("Creating IdentityAgent...");
  const agent = await IdentityAgent.create({ dwnManager, appData });
  console.log("Starting IdentityAgent...");
  await agent.start({ passphrase });

  console.log(`Creating ${name} ManagedIdentity...`);
  const identity = await agent.identityManager.create({
    name,
    didMethod: "ion",
    kms: "local",
  });
  console.log(`Created ${identity.name} ManagedIdentity: ${identity.did}`);
}
