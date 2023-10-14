import { v4 as uuid } from "uuid";
import { xchacha20_poly1305 } from "@noble/ciphers/chacha";
import { edwardsToMontgomeryPub, x25519 } from "@noble/curves/ed25519";
import { createJsonRpcRequest } from "@tbd54566975/web5-agent";
import { base58btc } from "multiformats/bases/base58";
import { base64url } from "multiformats/bases/base64";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";
import {
  DwnInterfaceName,
  DwnMethodName,
  PrivateKeySigner,
  Secp256k1,
  PermissionsRequest,
} from "@tbd54566975/dwn-sdk-js";
import { Temporal } from "@js-temporal/polyfill";

const initConnect = async (
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
  const connectionRequestCipherText = await fetchEncryptedConnectionRequest(
    connectId,
    serverURL
  );

  // decrypt the cipher text using the connectKey and connectNonce
  const decryptedPermissionsRequests = decryptConnectionRequest(
    connectionRequestCipherText,
    connectKey,
    connectNonce
  );

  // TODO: raise permissions request UI? Accept/deny. need designs.
  // Alert.alert(
  //   "Permissions Request",
  //   `DWA would like access to ${JSON.stringify(decryptedPermissionsRequest)}`,
  //   [
  //     {
  //       text: "Cancel",
  //       onPress: () => navigation.goBack(),
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => navigation.goBack() },
  //   ]
  // );

  // NOOP(decryptedPermissionsRequest);

  // TODO: raise identity selection UI. need designs.
  const selectedIdentityDid = "did:ion:EiCabc123";

  // // after User clicks "accept." Send grant? (check terminology) to DWN server.
  // const data = postPermissionsAuthorization(
  //   dwaSignPublicKey,
  //   selectedIdentityDid
  // );

  // // TODO: Add connection data to the DWN level store?
  // addConnectionToDwn(data);
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
const fetchEncryptedConnectionRequest = async (
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
  const { mockConnectionRequestCipherText } = await getMockConnectionRequest();

  return mockConnectionRequestCipherText;
};

/**
 * Create the cipher, decrypt the connectRequest, pull out permissions object
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

  const { permissionRequests } = JSON.parse(decryptedConnectRequest);

  // TODO: fix implicit any
  return permissionRequests;
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
const getMockConnectionRequest = async () => {
  const { privateJwk } = await Secp256k1.generateKeyPair();

  // mocked QR: z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD
  const authorizationSigner = new PrivateKeySigner({
    privateJwk,
    keyId: "did:key:z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD",
  });

  // ONLY partial permissions request is passed by the DWA
  // IDA constructs the permissionsrequest class, and then uses it to construct the permissionsgrant

  // the piece we dont have is when you are the DWA and have received back one or more grants
  // and are ready to write a message to yourself in your local DWN that needs to be
  // attached as a permissions granted because i dont have the keys to alice social i only
  // have rando keys made up but i want to sign on behalf of alice social.
  // the grantedFor property is what allows it to happen which is a special case

  // there needs to be an interface for this. (cobble it onto connect?)
  // web5.dwn.records.create is actually constructing a recordswrite create
  // there is no convenience method for this process
  // call directly into the DWN
  // now youve got the grant how do you write the record

  // the DWA cant know ahead of time the DIDs the IDA will select
  // what that means is the permisisons request must be created in the IDA

  // scenario: DWA sends PermissionsRequest (1) to IDA's DWN
  const mockPermissionsRequest1 = {
    messageTimestamp: Temporal.Now.instant().toString({
      smallestUnit: "microseconds",
    }),
    description: "drugs",
    // selected IDA DID
    grantedBy: "did:jank:IDA",
    // DWA did
    grantedTo: "did:key:z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD",
    // derived connect did
    grantedFor: "did:jank:DERIVED",
    scope: {
      interface: DwnInterfaceName.Records,
      method: DwnMethodName.Write,
      protocol: "profile",
    },
    // conditions omitted from mock because too new
    // TODO: who is the authorization signer, the DWA or the IDA?
    authorizationSigner,
  };

  // scenario: DWA sends PermissionsRequest (2) to IDA's DWN
  const mockPermissionsRequest2 = await PermissionsRequest.create({
    messageTimestamp: Temporal.Now.instant().toString({
      smallestUnit: "microseconds",
    }),
    description: "NFTs",
    // selected IDA DID
    grantedBy: "did:jank:IDA",
    // DWA did
    grantedTo: "did:key:z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD",
    // derived connect did
    grantedFor: "did:jank:IDA",
    scope: {
      interface: DwnInterfaceName.Records,
      method: DwnMethodName.Write,
      protocol: "profile",
    },
    // conditions omitted from mock because too new
    authorizationSigner,
  });

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

  const mockConnectionRequest = JSON.stringify({
    // TODO: is this the same as the grantedTo?
    did: "did:key:z6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD",
    // TODO: still not sure origin works under the hood
    origin: "dinger.xyz",
    permissionRequests: [mockPermissionsRequest1, mockPermissionsRequest2],
  });

  const mockConnectionRequestU8A = new TextEncoder().encode(
    mockConnectionRequest
  );

  const mockConnectionRequestCipherText = cipher.encrypt(
    mockConnectionRequestU8A
  );

  return {
    mockConnectionRequestCipherText,
    mockPrivateKey: privateJwk,
  };
};

const createPermissionGrant = () => {};

export const ConnectSuite = {
  initConnect,
  getMockConnectionRequest,
};
