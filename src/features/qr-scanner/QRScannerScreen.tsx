import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { useLinkTo } from "@react-navigation/native";
import { linking } from "../../navigation/deep-links";

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
    const deeplinkPrefix = linking.prefixes.find((prefix) =>
      data.startsWith(prefix)
    );
    if (deeplinkPrefix) {
      setScanned(true);
      const linkURL = data.replace(deeplinkPrefix, "/");
      navigation.goBack();
      linkTo(linkURL);
    }
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
});
