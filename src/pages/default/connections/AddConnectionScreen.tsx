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
    console.log(data);

    // instead use a mock
    const mockQRContent =
      "web5://connect?appDid=did%3Akey%3AzLCDinger&nonce=abc123&url=http%3A%2F%2Ffoobar.com%2Fdwn%2F";

    web5Connect(mockQRContent);
  };

  const web5Connect = (qrContent: string) => {
    try {
      // pull out the query params from the QR code
      const data = extractQueryParams(qrContent);

      // requirement: derive the connect key
      deriveConnectKey(data.connectDWADid);

      // requirement: call out to connect (TODO)
      sendConnect(data);
    } catch (e: any) {
      alert(e.message);
      navigation.goBack();
    }
  };

  const extractQueryParams = (qrContent: string) => {
    const { query } = queryString.parseUrl(qrContent);

    const connectDWADid = query.appDid;
    const connectNonce = query.nonce;
    const connectURL = query.url;

    if (
      typeof connectDWADid !== "string" ||
      typeof connectNonce !== "string" ||
      typeof connectURL !== "string"
    ) {
      throw new Error(
        "Received a malformed QR code. Please try scanning again."
      );
    }

    return { connectDWADid, connectNonce, connectURL };
  };

  // derive Connect ID and Connect Key from the public key of the DWA
  const deriveConnectKey = (dwaDid: string) => {
    const appSignKeyId = dwaDid.substr(dwaDid.lastIndexOf(":") + 1);
    const appSignPublicKey = base58btcMultibaseToBytes(appSignKeyId);

    // IDA derives the Connect UUID from the App's signing public key.
    const uuidU8A = hkdf(
      sha256,
      appSignPublicKey,
      undefined,
      "connect_uuid",
      32
    );
    const connectId = base64url.baseEncode(uuidU8A);
    const requestId = uuid();

    const jsonRpcRequest = createJsonRpcRequest(
      requestId,
      "connect.retrieveRequest",
      {
        uuid: connectId,
      }
    );
    const fetchOpts = {
      method: "POST",
      body: JSON.stringify(jsonRpcRequest),
    };

    console.log(appSignKeyId);
    console.log(appSignPublicKey);
    console.log(uuidU8A);
    console.log(connectId);

    return "DerivedConnectKey";
  };

  const sendConnect = (data: any) => {
    console.log(data);
  };

  const base58btcMultibaseToBytes = (base58btcMultibase: string) => {
    const multibaseBytes = base58btc.decode(base58btcMultibase);
    return multibaseBytes.slice(2);
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

const styles = StyleSheet.create({
  scanner: {
    height: 300,
  },
});

export default AddConnectionScreen;
