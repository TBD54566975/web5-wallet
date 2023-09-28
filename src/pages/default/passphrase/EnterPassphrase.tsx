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
      return;
    }

    // The passphrase is now known to successfully unlocked the app.
    // Store it if the user wants to enable biometric login.
    if (enableBiometryLogin) {
      await storePassphraseWithBiometrics();
    }

    await onLoginSuccess();
  };

  const storePassphraseWithBiometrics = async () => {
    try {
      // The passphrase shouldn't be stored in the keychain if the user doesn't grant
      // access to the system's biometric capabilities.
      //
      // `getGenericPassword` is the only function that will prompt the user to enable
      // biometrics: https://github.com/oblador/react-native-keychain/issues/392
      //
      // Call it right away, discarding any result, so that the prompt appears.
      // In the event that the user DOES deny the use of system biometrics,
      // the operation will throw.
      await Keychain.getGenericPassword({
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      });

      console.log("Setting the generic password");
      await Keychain.setGenericPassword("agentPassphrase", passphrase, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
        storage: Keychain.STORAGE_TYPE.RSA,
      });
    } catch (e) {
      console.error("Error saving biometric passphrase:", e);
    }
  };

  const attemptBiometricLogin = async (): Promise<boolean> => {
    const getResult = await Keychain.getGenericPassword({
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    });
    if (getResult) {
      try {
        await IdentityAgentManager.startAgent(getResult.password);
      } catch (e) {
        console.log(
          "Stored passphrase didn't unlock the IdentityAgent. Purging stored passphrase."
        );
        await Keychain.resetGenericPassword();
        return false;
      }
    }

    return true;
  };

  const onLoginSuccess = async () => {
    navigation.replace("Tabs", { screen: "DiscoverScreen" });
    await Deeplink.openDelayedDeeplinkIfNeeded();
  };

  useEffect(() => {
    const asyncWork = async () => {
      if (await attemptBiometricLogin()) {
        await onLoginSuccess();
      } else {
        setSupportedBiometryType(await Keychain.getSupportedBiometryType());
      }
    };
    void asyncWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
