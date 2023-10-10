import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import {
  BarCodeScanner,
  type BarCodeScannerResult,
} from "expo-barcode-scanner";
import queryString from "query-string";
import { ConnectSuite } from "./connect-suite";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { useMount } from "@/hooks/useMount";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"ConnectQRScanScreen">;
const ConnectQRScanScreen = ({ navigation }: Props) => {
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

    try {
      const qrParams = extractQueryParams(data);
      navigation.navigate("ConnectProfileSelectScreen", qrParams);

      // initConnect(qrParams.dwaDID, qrParams.connectNonce, qrParams.serverURL);
    } catch (e: any) {
      // TODO: probably use a snackbar for this error instead
      // https://github.com/TBD54566975/web5-wallet/pull/125#discussion_r1344175344
      alert(e.message);
    }
  };

  const extractQueryParams = (qrContent: string) => {
    const { query } = queryString.parseUrl(qrContent);

    if (
      typeof query.temporaryDid !== "string" ||
      typeof query.url !== "string" ||
      typeof query.nonce !== "string"
    ) {
      throw new Error(
        "Received a malformed QR code. Please try scanning again."
      );
    }

    const temporaryDid = query.temporaryDid;
    const serverURL = query.url;
    const connectNonce = query.nonce;
    const uInt8Validation = ConnectSuite.stringToUInt8Array(query.nonce);

    if (!(uInt8Validation instanceof Uint8Array)) {
      throw new Error(
        "Not a valid connect nonce. Failed to create Uint8Array from scanned string."
      );
    }

    return { temporaryDid, connectNonce, serverURL };
  };

  // test util to mock a valid scan
  useMount(() => {
    setTimeout(() => {
      const mockQRContent =
        "web5://connect?temporaryDid=did%3Akey%3Az6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD&nonce=%5B0%2C%201%2C%202%2C%203%5D&url=http%3A%2F%2Ffoobar.com%2Fdwn%2F";

      onQRCodeScanned({ data: mockQRContent } as any);
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

export default ConnectQRScanScreen;
