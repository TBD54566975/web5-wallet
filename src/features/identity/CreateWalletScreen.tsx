import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { defaultIdentities } from "@/features/identity/default-identities";
import { Deeplink } from "@/features/app/deeplink";
import { BiometricLogin } from "@/features/auth/biometric-login";
import { useMount } from "@/hooks/useMount";

type Props = AppNavigatorProps<"CreateWalletScreen">;

const CreateWalletScreen = ({ navigation, route }: Props) => {
  useMount(() => {
    const createWallet = async () => {
      try {
        await IdentityAgentManager.startAgent(route.params.passphrase);

        const defaultIdentityCreatePromises = defaultIdentities.map(
          (identity) => {
            return IdentityAgentManager.createIdentity(
              identity.name,
              identity.displayName
            );
          }
        );
        await Promise.all(defaultIdentityCreatePromises);
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
        <Text style={centerTextStyle}>Creating your wallet...</Text>
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
});

const centerTextStyle = StyleSheet.create([
  Typography.body2,
  { textAlign: "center" },
]);

export default CreateWalletScreen;
