import crypto from "crypto";
import { randomDidKey } from "verite";
import { DID, generateKeyPair } from "@decentralized-identity/ion-tools";

const createDidKey = () => {
  const didKey = randomDidKey(crypto.randomBytes);

  return didKey;
};

const createDidIon = async () => {
  const authnKeys = await generateKeyPair();
  const did = new DID({
    content: {
      publicKeys: [
        {
          id: "key-1",
          type: "EcdsaSecp256k1VerificationKey2019",
          publicKeyJwk: authnKeys.publicJwk,
          purposes: ["authentication"],
        },
      ],
      services: [
        {
          id: "domain-1",
          type: "LinkedDomains",
          serviceEndpoint: "https://foo.example.com",
        },
      ],
    },
  });

  const shortFormURI: string = await did.getURI("short");

  return shortFormURI;
};

export const DidService = { createDidKey, createDidIon };
