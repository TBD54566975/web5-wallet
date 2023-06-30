import { useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLinkTo } from "@react-navigation/native";

export const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const linkTo = useLinkTo();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const onPressClose = () => {
    navigation.goBack();
  };

  const onBarCodeScanned = async ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    const cleanedUrl = data.replace(/^web5:\/\//i, "/");
    console.log("I see a qr code: " + data);
    console.log("cleanedUrl: " + cleanedUrl);

    linkTo(cleanedUrl);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <SafeAreaView>
            <IconButton icon="close" iconColor="white" onPress={onPressClose} />
          </SafeAreaView>
        </BarCodeScanner>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    paddingTop: 10,
  },
});
