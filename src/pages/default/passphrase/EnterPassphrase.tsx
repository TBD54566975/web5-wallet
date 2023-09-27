import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import * as Keychain from "react-native-keychain";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { Deeplink } from "@/features/deeplink/deeplink";

type Props = AppNavigatorProps<"EnterPassphraseScreen">;

const EnterPassphraseScreen = ({ navigation }: Props) => {
  const [passphrase, setPassphrase] = useState<string>("");

  const isLoginButtonDisabled = passphrase?.length === 0;

  const loginTapped = async () => {
    try {
      await IdentityAgentManager.startAgent(passphrase);
      navigation.replace("Tabs", { screen: "DiscoverScreen" });
      await Deeplink.openDelayedDeeplinkIfNeeded();
    } catch (e) {
      console.error("Error logging in:", e);
      Alert.alert(
        "Error logging in",
        "Close this dialog, double check your passphrase, and try again.",
        [
          {
            text: "Ok",
          },
        ]
      );
    }
  };

  useEffect(() => {
    const foo = async () => {
      console.log("yo dawg");
      const supportedBiometryType = await Keychain.getSupportedBiometryType();
      console.log("supportedBiometryType:", supportedBiometryType);
      const canImply = await Keychain.canImplyAuthentication();
      console.log("canImply:", canImply);

      const setResult = await Keychain.setGenericPassword("foo", "bar", {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      });
      console.log("Result:", JSON.stringify(setResult));

      const getResult = await Keychain.getGenericPassword();
      console.log("getResult:", JSON.stringify(getResult));
    };
    void foo();
  }, []);

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.containerVerticalCenter]}>
        <Text style={Typography.heading1}>Enter your passphrase</Text>
        <View style={Layouts.row}>
          <Input
            label=""
            nativeID="passphrase"
            placeholder={"Passphrase"}
            value={passphrase}
            onChangeText={setPassphrase}
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>
        <Button
          kind={isLoginButtonDisabled ? "disabled" : "primary"}
          text="Login"
          onPress={loginTapped}
          disabled={isLoginButtonDisabled}
        />
        <View>
          <Text>Enable biometric login?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterPassphraseScreen;
