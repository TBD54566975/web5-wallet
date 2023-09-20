import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { defaultIdentities } from "@/pages/onboarding/create/default_identities";

type Props = AppNavigatorProps<"CreateWalletScreen">;

const CreateWalletScreen = ({ navigation, route }: Props) => {
  useEffect(() => {
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
        navigation.replace("Tabs", { screen: "DiscoverScreen" });
      } catch (e) {
        console.error(e);
      }
    };

    void createWallet();
  }, []);

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.containerVerticalCenter]}>
        <ActivityIndicator size="large" />
        <Text style={[Typography.body2, Typography.textCenter]}>
          Creating your wallet...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateWalletScreen;
