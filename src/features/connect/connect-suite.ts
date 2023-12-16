import { v4 as uuid } from "uuid";
import { xchacha20_poly1305 } from "@noble/ciphers/chacha";
import { edwardsToMontgomeryPub, x25519 } from "@noble/curves/ed25519";
import { createJsonRpcRequest } from "@web5/agent";
import { base58btc } from "multiformats/bases/base58";
import { base64url } from "multiformats/bases/base64";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";
import {
  DwnInterfaceName,
  DwnMethodName,
  PermissionsGrant,
  PrivateKeySigner,
  Secp256k1,
} from "@tbd54566975/dwn-sdk-js";
import { Temporal } from "@js-temporal/polyfill";
import type {
  ConnectRequest,
  ConnectRequestPermission,
} from "../../types/models";

const initConnect = (
  dwaDID: string,
  stringNonce: string,
  serverURL: string
) => {
  // mocked QR: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,]
  const arrayNonce = JSON.parse(stringNonce);
  const connectNonce = new Uint8Array(arrayNonce);

  // mocked QR: z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD
  const dwaSignKeyID = dwaDID.substring(dwaDID.lastIndexOf(":") + 1);
  const dwaSignPublicKey = base58btcMultibaseToBytes(dwaSignKeyID);

  // derive the Connect Id from the DWA's signing public key.
  const connectIdU8A = hkdf(
    sha256,
    dwaSignPublicKey,
    undefined,
    "connect_uuid",
    32
  );
  const connectId = base64url.baseEncode(connectIdU8A);

  // derive the Connect Key from the DWA's signing public key
  const connectKey = hkdf(
    sha256,
    dwaSignPublicKey,
    undefined,
    "connect_encryption_key",
    32
  );

  // call into DWN server using the passed QR data
  const connectionRequestCipherText = fetchEncryptedConnectionRequest(
    connectId,
    serverURL
  );

  // decrypt the cipher text using the connectKey and connectNonce
  const decryptedConnectRequest = decryptConnectionRequest(
    connectionRequestCipherText,
    connectKey,
    connectNonce
  );

  return decryptedConnectRequest;
};

const createGrantsForDid = async (
  selectedDid: string,
  connectRequest: ConnectRequest
) => {
  try {
    const { privateJwk } = await Secp256k1.generateKeyPair();
    const signer = new PrivateKeySigner({
      privateJwk,
      keyId: "did:jank:bob",
    });

    const messages = connectRequest.permissionRequests.map(
      (permissionRequest) =>
        PermissionsGrant.create({
          dateExpires: Temporal.Now.instant().toString({
            smallestUnit: "microseconds",
          }),
          description: permissionRequest.description,
          // selected did
          grantedBy: selectedDid,
          // app level did
          grantedTo: "did:jank:alicesocialdignal",
          // selected did
          grantedFor: selectedDid,
          scope: {
            interface: DwnInterfaceName.Records,
            method: DwnMethodName.Write,
          },
          signer,
        })
    );

    return await Promise.all(messages);
  } catch (e) {
    console.warn(e);
  }
};

const submitConnection = async (
  connectRequest: ConnectRequest,
  selectedDids: string[]
) => {
  try {
    const grantPromises = selectedDids.map((did) =>
      createGrantsForDid(did, connectRequest)
    );

    const createdGrants = (await Promise.all(grantPromises)).flat();
    NOOP(createdGrants);
    NOOP(postPermissionsAuthorization);
  } catch (e) {
    console.warn(e);
  }
};

const postPermissionsAuthorization = (
  dwaSignPublicKey: Uint8Array,
  payload: string
) => {
  // Generate the challenge PIN.
  const pin = generatePin();

  // perform ECDH-ES-XC20PKW with the ION DID private key and
  // DWA's signing public key.

  // derive the DWA's key agreement key to be used with ECDH.
  const appKAPublicKey = edwardsToMontgomeryPub(dwaSignPublicKey);

  // create an ephemeral key to pair use with ECDH-ES.
  const ephemeralPrivateKey = x25519.utils.randomPrivateKey();
  const ephemeralPublicKey = x25519.getPublicKey(ephemeralPrivateKey);

  // Using DWA's key agreement public key, generate a shared secret
  // with ECDH using Curve25519 aka X25519.
  const sharedSecret = x25519.getSharedSecret(
    ephemeralPrivateKey,
    appKAPublicKey
  );

  // IDA HTTP Posts the JWE to the Connect Server using the App's Connect UUID.
  // including the challenge PIN encrypted.
  NOOP(payload);
  NOOP(sharedSecret);
  NOOP(ephemeralPublicKey);
  NOOP(pin);

  // Hardcode result
  return { connectionName: "Dignal", connectedTo: "Social profile" };
};

/**
 * Reach out to connect server to get cipher text with connectRequest inside
 */
const fetchEncryptedConnectionRequest = (
  connectId: string,
  connectURL: string
) => {
  const requestId = uuid();
  const jsonRpcRequest = createJsonRpcRequest(
    requestId,
    "connect.retrieveRequest",
    {
      uuid: connectId,
    }
  );

  // mock away the fetch for now
  NOOP(jsonRpcRequest);
  NOOP(connectURL);

  // const response = await fetch(connectURL, {
  //   method: "POST",
  //   body: JSON.stringify(jsonRpcRequest),
  // });
  // const { message: connectRequestCipherText } = await response.json();

  // instead get a mocked connection request
  const mockConnectionRequestCipherText = getMockConnectionRequest();

  return mockConnectionRequestCipherText;
};

/**
 * Takes an encrypted connection request along with a key and nonce.
 * Uses the XChaCha20-Poly1305 algorithm to decrypt the connection request.
 * Parses the decrypted request to obtain a `ConnectRequest` object.
 *
 * @throws Will throw an error if decryption fails.
 * @todo add more error handling: https://github.com/TBD54566975/web5-wallet/issues/151
 */
const decryptConnectionRequest = (
  cipherText: Uint8Array,
  connectKey: Uint8Array,
  connectNonce: Uint8Array
) => {
  const cipher = xchacha20_poly1305(connectKey, connectNonce);
  const decryptedConnectRequestU8A = cipher.decrypt(cipherText);
  const decryptedConnectRequest = new TextDecoder().decode(
    decryptedConnectRequestU8A
  );

  const connectionRequest: ConnectRequest = JSON.parse(decryptedConnectRequest);
  return connectionRequest;
};

const base58btcMultibaseToBytes = (base58btcMultibase: string) => {
  const multibaseBytes = base58btc.decode(base58btcMultibase);
  return multibaseBytes.slice(2);
};

const generatePin = () => {
  return "1234;";
};

/**
 * This is a whopper of a method that mocks the steps of a DWA
 * required in order to mock a connection request.
 * I don't want to break this up into separate utils so I can centralize this mock.
 */
const getMockConnectionRequest = () => {
  const mockPermissionsRequest1: ConnectRequestPermission = {
    messageTimestamp: Temporal.Now.instant().toString({
      smallestUnit: "microseconds",
    }),
    description: "drugs",
    scope: {
      interface: DwnInterfaceName.Records,
      method: DwnMethodName.Write,
      protocol: "profile",
    },
    // @ts-expect-error this is a mock
    signer: undefined,
  };

  const mockPermissionsRequest2: ConnectRequestPermission = {
    messageTimestamp: Temporal.Now.instant().toString({
      smallestUnit: "microseconds",
    }),
    description: "NFTs",
    scope: {
      interface: DwnInterfaceName.Records,
      method: DwnMethodName.Write,
      protocol: "profile",
    },
    // @ts-expect-error this is a mock
    signer: undefined,
  };

  const mockConnectionRequest: ConnectRequest = {
    did: "did:key:dwa",
    origin: "dinger.xyz",
    permissionRequests: [mockPermissionsRequest1, mockPermissionsRequest2],
  };

  // we need a new field in the grant "delegatedGrant?"

  // mocked QR: z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD
  const signPublicKey = base58btcMultibaseToBytes(
    "z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD"
  );

  const connectKey = hkdf(
    sha256,
    signPublicKey,
    undefined,
    "connect_encryption_key",
    32
  );

  // mocked QR nonce: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  const mockNonce = new Uint8Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]);

  const cipher = xchacha20_poly1305(connectKey, mockNonce);

  const mockConnectionRequestU8A = new TextEncoder().encode(
    JSON.stringify(mockConnectionRequest)
  );

  const mockConnectionRequestCipherText = cipher.encrypt(
    mockConnectionRequestU8A
  );

  return mockConnectionRequestCipherText;
};

export const ConnectSuite = {
  initConnect,
  getMockConnectionRequest,
  submitConnection,
};
