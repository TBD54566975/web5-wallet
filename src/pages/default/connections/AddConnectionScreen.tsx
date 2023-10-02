import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import {
  BarCodeScanner,
  type BarCodeScannerResult,
} from "expo-barcode-scanner";
import queryString from "query-string";
import { v4 as uuid } from "uuid";
import { base58btc } from "multiformats/bases/base58";
import { base64url } from "multiformats/bases/base64";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";
import { xchacha20_poly1305 } from "@noble/ciphers/chacha";
import { createJsonRpcRequest } from "@tbd54566975/web5-agent";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { useMount } from "@/hooks/useMount";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"AddConnectionScreen">;
const AddConnectionScreen = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    void getBarCodeScannerPermissions();
  }, []);

  const onQRCodeScanned = ({ data }: BarCodeScannerResult) => {
    setIsScanned(true);

    // temporarily throw away the real data of whatever QR code that got scanned
    NOOP(data);

    // instead use a mock
    const mockQRContent =
      "web5://connect?appDid=did%3Akey%3AzLCDinger&nonce=%5B0%2C%201%2C%202%2C%203%5D&url=http%3A%2F%2Ffoobar.com%2Fdwn%2F";

    void web5Connect(mockQRContent);
  };

  const web5Connect = (qrContent: string) => {
    try {
      // pull out the query params from the QR code
      const data = extractQueryParams(qrContent);

      deriveConnectKey(data.dwaDID, data.connectNonce, data.serverURL);
    } catch (e: any) {
      alert(e.message);
      navigation.goBack();
    }
  };

  const extractQueryParams = (qrContent: string) => {
    const { query } = queryString.parseUrl(qrContent);

    if (
      typeof query.appDid !== "string" ||
      typeof query.url !== "string" ||
      typeof query.nonce !== "string"
    ) {
      throw new Error(
        "Received a malformed QR code. Please try scanning again."
      );
    }

    const dwaDID = query.appDid;
    const serverURL = query.url;
    const connectNonce = stringifiedArrayToUInt8Array(query.nonce);

    if (!(connectNonce instanceof Uint8Array)) {
      throw new Error(
        "Not a valid connect nonce. Failed to create Uint8Array from it."
      );
    }

    return { dwaDID, connectNonce, serverURL };
  };

  // derive Connect ID and Connect Key from the public key of the DWA
  const deriveConnectKey = (
    dwaDID: string,
    connectNonce: Uint8Array,
    serverURL: string
  ) => {
    const dwaSignKeyID = dwaDID.substring(dwaDID.lastIndexOf(":") + 1);
    const dwaSignPublicKey = base58btcMultibaseToBytes(dwaSignKeyID);

    // derive the Connect UUID from the DWA's signing public key.
    const connectUUID = hkdf(
      sha256,
      dwaSignPublicKey,
      undefined,
      "connect_uuid",
      32
    );
    const connectId = base64url.baseEncode(connectUUID);

    // derive the connect key from the DWA's public key
    const connectKey = hkdf(
      sha256,
      dwaSignPublicKey,
      undefined,
      "connect_encryption_key",
      32
    );

    console.log(dwaSignKeyID);
    console.log(dwaSignPublicKey);
    console.log(connectUUID);
    console.log(connectId);

    const connectRequestCipherText = fetchConnectRequestCipherText(
      connectId,
      serverURL
    );

    // decrypt connection request that came from Connect Server
    const permissionRequests = decryptConnectRequest(
      connectRequestCipherText,
      connectKey,
      connectNonce
    );

    // TODO: is the mock I'm returning the final shape of these
    NOOP(permissionRequests);

    // User selects the ION DID to use with the DWA.
    // TODO: prompt UI? need designs.
    // const connectedDid = "did:ion:EiCabc123";

    // User authorizes the connection request, including requested permissions.
    return { dwaSignPublicKey };
  };

  /**
   * Reach out to connect server to get cipher text with connectRequest inside
   */
  const fetchConnectRequestCipherText = (
    connectId: string,
    connectURL: string
  ) => {
    // mock away the fetch for now
    const requestId = uuid();
    const jsonRpcRequest = createJsonRpcRequest(
      requestId,
      "connect.retrieveRequest",
      {
        uuid: connectId,
      }
    );
    NOOP(jsonRpcRequest);
    NOOP(connectURL);
    // const response = await fetch(connectURL, {
    //   method: "POST",
    //   body: JSON.stringify(jsonRpcRequest),
    // });
    // const { message: connectRequestCipherText } = await response.json();

    // mock bc we dont fetch yet
    const connectRequestCipherText = new Uint8Array([9, 9, 9]);

    return connectRequestCipherText;
  };

  /**
   * Create the cipher, decrypt the connectRequest, pull out permissions object
   */
  const decryptConnectRequest = (
    cipherText: Uint8Array,
    connectKey: Uint8Array,
    connectNonce: Uint8Array
  ) => {
    // do nothing with the cipher and instead mock getting
    // back a permission req because we dont fetch yet
    const cipher = xchacha20_poly1305(connectKey, connectNonce);
    NOOP(cipher);
    // const decryptedConnectRequest = cipher.decrypt(cipherText).toString();
    // const connectRequest = JSON.parse(decryptedConnectRequest);
    // const { permissionsRequests } = connectRequest;

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

  // mock a valid scan
  useMount(() => {
    setTimeout(() => {
      onQRCodeScanned("abc" as any);
    }, 3000);
  });

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={Layouts.container}>
        {hasPermission === null && (
          <Text>You must grant camera permissions to use Connect.</Text>
        )}
        {hasPermission === false && (
          <Text>
            You have declined Camera access. Please go to Settings and grant
            Camera access to this app in order to Connect.
          </Text>
        )}
        {hasPermission === true && (
          <>
            <BarCodeScanner
              onBarCodeScanned={isScanned ? undefined : onQRCodeScanned}
              style={styles.scanner}
            />
            <Text>To connect, please scan a valid QR code from a Web5 DWA</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const base58btcMultibaseToBytes = (base58btcMultibase: string) => {
  const multibaseBytes = base58btc.decode(base58btcMultibase);
  return multibaseBytes.slice(2);
};

const stringifiedArrayToUInt8Array = (stringifiedArray: string) => {
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

const styles = StyleSheet.create({
  scanner: {
    height: 300,
  },
});

export default AddConnectionScreen;
