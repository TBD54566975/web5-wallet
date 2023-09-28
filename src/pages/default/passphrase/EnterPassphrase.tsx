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
      await IdentityAgentManager.startAgent(passphrase).then(onLoginSuccess);
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

    if (enableBiometryLogin) {
      try {
        // Call `getGenericPassword` before actually setting the password.
        // This will prompt the use to allow the app access to biometrics if they
        // haven't already, as `setGenericPassword` will not.
        await Keychain.getGenericPassword({
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
        });

        console.log("Setting the generic password");
        await Keychain.setGenericPassword("username", passphrase, {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
          storage: Keychain.STORAGE_TYPE.RSA,
        });
      } catch (e) {
        console.error("Error saving biometric passphrase:", e);
      }
    }
  };

  const onLoginSuccess = async () => {
    navigation.replace("Tabs", { screen: "DiscoverScreen" });
    await Deeplink.openDelayedDeeplinkIfNeeded();
  };

  useEffect(() => {
    const foo = async () => {
      const f = await Keychain.getGenericPassword();
      if (f) {
        const storedPassphrase = f.password;
        try {
          await IdentityAgentManager.startAgent(storedPassphrase).then(
            onLoginSuccess
          );
        } catch (e) {
          console.log(
            "Stored passphrase didn't unlock vault. Purging stored passphrase."
          );

          await Keychain.resetGenericPassword();
        }
      }

      setSupportedBiometryType(await Keychain.getSupportedBiometryType());
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
