import React from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";

const WelcomeScreen = ({ navigation }) => {
  // TODO: Replace with flow for importing wallet
  // navigation.navigate("Import");
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

  // TODO: Replace with new ID Agent work
  const navigateToCreateWallet = () => {
    navigation.navigate("Create");
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
          <Button kind="primary" onPress={navigateToCreateWallet}>
            Create a new wallet
          </Button>
          <Text style={[Typography.label1, Typography.textCenter]}>or</Text>
          <Button kind="secondary" onPress={navigateToImportWallet}>
            Import your wallet
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
