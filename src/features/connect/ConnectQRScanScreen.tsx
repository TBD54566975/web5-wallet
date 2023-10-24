import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import {
  BarCodeScanner,
  type BarCodeScannerResult,
} from "expo-barcode-scanner";
import queryString from "query-string";
import { SPACE } from "@/theme/layouts";
import { useMount } from "@/hooks/useMount";
import { Button } from "@/components/Button";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"ConnectQRScanScreen">;
const ConnectQRScanScreen = ({ navigation }: Props) => {
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

    return { temporaryDid, connectNonce, serverURL };
  };

  // test util to mock a valid scan
  // useMount(() => {
  //   setTimeout(() => {
  //     const mockQRContent =
  //       "web5://connect?nonce=%5B0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%5D&temporaryDid=did%3Akey%3Az6MknCyPKLhv92CoHZsqJF1XHE6fchHKJfoqh26GAsCwUewD&url=http%3A%2F%2Ffoobar.com%2Fdwn%2F";

  //     onQRCodeScanned({ data: mockQRContent } as any);
  //   }, 3000);
  // });

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

export default ConnectQRScanScreen;
