import { v4 as uuid } from "uuid";
import { xchacha20_poly1305 } from "@noble/ciphers/chacha";
import { edwardsToMontgomeryPub, x25519 } from "@noble/curves/ed25519";
import { createJsonRpcRequest } from "@tbd54566975/web5-agent";
import { base58btc } from "multiformats/bases/base58";
import { base64url } from "multiformats/bases/base64";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";

const initConnect = (
  dwaDID: string,
  connectNonce: Uint8Array,
  serverURL: string
) => {
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

  console.log(dwaSignKeyID);
  console.log(dwaSignPublicKey);
  console.log(connectIdU8A);
  console.log(connectId);

  // call into DWN server using the passed QR data
  const connectionRequestCipherText = fetchEncryptedConnectionRequest(
    connectId,
    serverURL
  );

  // decrypt the cipher text using the connectKey and connectNonce
  const decryptedPermissionsRequest = decryptConnectionRequest(
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

  NOOP(decryptedPermissionsRequest);

  // TODO: raise identity selection UI. need designs.
  const selectedIdentityDid = "did:ion:EiCabc123";

  // after User clicks "accept." Send grant? (check terminology) to DWN server.
  const data = postPermissionsAuthorization(
    dwaSignPublicKey,
    selectedIdentityDid
  );

  // TODO: Add connection data to the DWN level store?
  addConnectionToDwn(data);
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

  // return mock bc we dont fetch yet
  const mockCipherText = new Uint8Array([9, 9, 9]);

  return mockCipherText;
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
  NOOP(cipher);

  // do nothing with the cipher and instead mock getting
  // back a permission req because we dont fetch yet

  // const decryptedConnectRequest = cipher.decrypt(cipherText).toString();
  // const connectRequest = JSON.parse(decryptedConnectRequest);
  // const { permissionsRequests } = connectRequest;

  // TODO: is the mock I'm using the final shape of these?
  const mockPermissionsRequests = [
    {
      scope: {
        protocol: "http://garfield.com/profile.schema.json",
      },
      conditions: {
        delegation: false,
        publication: false,
        sharedAccess: true,
        encryption: "required",
        attestation: "prohibited",
      },
    },
  ];

  return mockPermissionsRequests;
};

const addConnectionToDwn = (connectionData: any) => {
  NOOP(connectionData);
};

const base58btcMultibaseToBytes = (base58btcMultibase: string) => {
  const multibaseBytes = base58btc.decode(base58btcMultibase);
  return multibaseBytes.slice(2);
};

const stringToUInt8Array = (stringifiedArray: string) => {
  try {
    // Parse JSON string to get an array
    const parsedArray = JSON.parse(stringifiedArray);

    // Optional: Concatenate array elements
    const concatenatedString = parsedArray.join(",");

    // Encode the string to bytes
    const utf8Bytes = new TextEncoder().encode(concatenatedString);

    // Create and return a UInt8Array
    return new Uint8Array(utf8Bytes);
  } catch (e) {
    return null;
  }
};

const generatePin = () => {
  return "1234;";
};

export const ConnectSuite = { initConnect, stringToUInt8Array };
