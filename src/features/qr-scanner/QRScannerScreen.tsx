import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";

export const QRScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleScan = ({ type, data }) => {};

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <SafeAreaView>
        <BarCodeScanner
          onBarCodeScanned={handleScan}
          style={StyleSheet.absoluteFillObject}
        />
      </SafeAreaView>
    );
  }
};
