import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMount } from "../../hooks/useMount";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { Deeplink } from "../app/deeplink";
import { BiometricLogin } from "./biometric-login";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import type { AppNavigatorProps } from "../../types/navigation";

type Props = AppNavigatorProps<"CreateWalletScreen">;

export const CreateWalletScreen = ({ navigation, route }: Props) => {
  useMount(() => {
    const createWallet = async () => {
      try {
        await IdentityAgentManager.initialize(route.params.passphrase);
        await IdentityAgentManager.createIdentity(route.params.profileName);
        // User just created a brand new wallet. Clear any stored biometric login
        // data that may be stored locally on device.
        await BiometricLogin.clearStoredPassphrase();
        navigation.replace("Tabs", { screen: "DiscoverScreen" });
        await Deeplink.openDelayedDeeplinkIfNeeded();
      } catch (e) {
        console.error(e);
      }
    };

    void createWallet();
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Creating your wallet...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    margin: SPACE.BASE,
    flex: 1,
    justifyContent: "center",
  },
  text: { ...Typography.body2, textAlign: "center" },
});
