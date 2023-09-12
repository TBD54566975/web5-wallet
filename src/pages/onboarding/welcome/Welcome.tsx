import React from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"WelcomeScreen">;
const WelcomeScreen = ({ navigation }: Props) => {
  const navigateToImportWallet = () => {
    Alert.alert(
      "Import not yet available",
      "You will need to create a new wallet until this feature becomes available.",
      [
        {
          text: "Ok, change selection",
        },
      ]
    );
  };

  const navigateToCreateWallet = () => {
    navigation.navigate("CreateProfilesScreen");
  };

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.containerVerticalCenter]}>
        <Text style={Typography.heading1}>Welcome to Identity Agent</Text>
        <Text style={Typography.paragraph1}>
          Take control of your online identity and personal data.
        </Text>
        <Text style={Typography.paragraph1}>
          Sign into apps with an identity you own and control.
        </Text>
        <View style={FlexLayouts.column}>
          <Button
            kind="primary"
            onPress={navigateToCreateWallet}
            text="Create a new wallet"
          />
          <Text style={[Typography.label1, Typography.textCenter]}>or</Text>
          <Button
            kind="secondary"
            onPress={navigateToImportWallet}
            text="Import your wallet"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
