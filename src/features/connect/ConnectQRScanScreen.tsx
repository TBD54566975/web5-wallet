import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import {
  BarCodeScanner,
  type BarCodeScannerResult,
} from "expo-barcode-scanner";
import queryString from "query-string";
import { useMount } from "../../hooks/useMount";
import { SPACE } from "../../theme/layouts";
import type { AppNavigatorProps } from "../../types/navigation";
import { Button } from "../../components/Button";

type Props = AppNavigatorProps<"ConnectQRScanScreen">;
export const ConnectQRScanScreen = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanned, setIsScanned] = useState(false);

  useMount(() => {
    const checkCameraPermissions = async () => {
      const { status } = await BarCodeScanner.getPermissionsAsync();

      if (status === "granted") {
        setHasPermission(true);
      }
    };

    void checkCameraPermissions();
  });

  const requestCameraPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    if (status !== "undetermined") {
      setHasPermission(status === "granted");
    }
  };

  const onQRCodeScanned = ({ data }: BarCodeScannerResult) => {
    setIsScanned(true);

    try {
      const qrParams = extractQueryParams(data);
      navigation.navigate("ConnectProfileSelectScreen", qrParams);
    } catch (e: any) {
      // TODO: probably use a snackbar for this error instead
      // https://github.com/TBD54566975/web5-wallet/pull/125#discussion_r1344175344
      console.warn(e.message);
    }
  };

  const extractQueryParams = (qrContent: string) => {
    const { query } = queryString.parseUrl(qrContent);

    if (
      typeof query.client_did !== "string" ||
      typeof query.request_uri !== "string" ||
      typeof query.code_challenge !== "string"
    ) {
      throw new Error(
        "Received a malformed QR code. Please try scanning again."
      );
    }

    const client_did = query.client_did;
    const request_uri = query.request_uri;
    const code_challenge = query.code_challenge;

    return { client_did, request_uri, code_challenge };
  };

  // test util to mock a valid scan
  useMount(() => {
    setTimeout(() => {
      const mockQRContent =
        "web5://connect/?nonce=DplNeqpfBoWO0U63pZrfqLYUQwXngx7C&request_uri=http%3A%2F%2Flocalhost%3A8080%2Fconnect%2Fauthorize%2Faed11a62-cb13-48e3-8807-47db2ee3776b.jwt&client_did=did%3Adht%3Auk57yf8rr7p77hq4sdpecbrksu87dju7zobk41gffup6fjde9rko&code_challenge=BRugXj8tfoVQam7jN57H8WVT6OQ9PGmg_9KRKTV1I5g";

      onQRCodeScanned({ data: mockQRContent } as any);
    }, 3000);
  });

  if (hasPermission) {
    return (
      <>
        <BarCodeScanner
          onBarCodeScanned={isScanned ? undefined : onQRCodeScanned}
          style={styles.scanner}
        />
        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.cameraView} />
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <Text style={styles.cameraText}>
              To connect scan a QR code from a Web5 app
            </Text>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom} />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {hasPermission === null && (
          <>
            <Text>Please grant camera permissions to use connect.</Text>
            <Button
              kind="primary"
              text="Request Camera Permissions"
              onPress={() => requestCameraPermissions()}
            />
          </>
        )}
        {hasPermission === false && (
          <>
            <Text>
              You have declined Camera access. Please go to Settings and grant
              Camera access to this app in order to Connect.
            </Text>
            <Button
              kind="primary"
              text="Close"
              onPress={() => navigation.goBack()}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
  scanner: {
    flex: 1,
  },
  cameraText: {
    color: "#FFF",
    padding: SPACE.LARGE,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  overlayMiddle: {
    flexDirection: "row",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  cameraView: {
    minWidth: 292,
    minHeight: 292,
    borderColor: "#FFF",
    borderStyle: "dotted",
    borderWidth: 4,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
