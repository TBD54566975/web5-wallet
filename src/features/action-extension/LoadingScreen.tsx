import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ActionExtensionStackParamList } from "../../navigation/ActionExtensionNavigator";
import ActionExtension from "./ActionExtension";
import { WalletRequest } from "./ActionExtensionTypes";

type LoadingScreenNavigationProp = NativeStackNavigationProp<
  ActionExtensionStackParamList,
  "LoadingScreen"
>;

type Props = {
  navigation: LoadingScreenNavigationProp;
};

export const LoadingScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const getWalletRequestFromExtension = async () => {
      try {
        const request = await ActionExtension.getWalletRequest();
        pushScreenForRequest(request);
      } catch (e) {
        console.error("Error getting wallet request: " + e);
      }
    };
    getWalletRequestFromExtension();
  }, []);

  const pushScreenForRequest = (request: WalletRequest) => {
    switch (request.kind) {
      case "PresentationDefinition":
        navigation.navigate("PresentationRequestScreen", {
          pd: request.value,
        });
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Text variant="titleLarge">Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
