import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { FlexLayouts, Layouts, SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { Deeplink } from "@/features/deeplink/deeplink";
import * as Keychain from "react-native-keychain";

type Props = AppNavigatorProps<"EnterPassphraseScreen">;

const EnterPassphraseScreen = ({ navigation }: Props) => {
  const [passphrase, setPassphrase] = useState<string>("");
  const [supportedBiometryType, setSupportedBiometryType] =
    useState<Keychain.BIOMETRY_TYPE | null>(null);
  const [enableBiometryLogin, setEnableBiometryLogin] = useState(false);

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
      setSupportedBiometryType(await Keychain.getSupportedBiometryType());

      // const resetResult = await Keychain.resetGenericPassword();
      // console.log("resetResult:", resetResult);

      const canImply = await Keychain.canImplyAuthentication();
      console.log("canImply:", canImply);

      // const setResult = await Keychain.setGenericPassword(
      //   "foo",
      //   "bar"
      //   // , {
      //   //   accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      //   //   accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      //   //   authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      //   // }
      // );
      // console.log("Result:", JSON.stringify(setResult));

      try {
        const getResult = await Keychain.getGenericPassword();
        console.log("getResult:", JSON.stringify(getResult));
      } catch (e) {
        console.error("getGenericPassword Error:", e);
      }
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
        {!!supportedBiometryType && (
          <View style={styles.biometricLoginRow}>
            <Text style={FlexLayouts.wrapper}>Enable biometric login?</Text>
            <Switch
              onValueChange={setEnableBiometryLogin}
              value={enableBiometryLogin}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  biometricLoginRow: {
    flexDirection: "row",
    paddingVertical: SPACE.LARGE,
  },
});

export default EnterPassphraseScreen;
