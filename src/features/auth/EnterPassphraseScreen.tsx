import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { FlexLayouts, Layouts, SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { Deeplink } from "@/features/app/deeplink";
import { BiometricLogin } from "@/features/auth/biometric-login";

type Props = AppNavigatorProps<"EnterPassphraseScreen">;

const EnterPassphraseScreen = ({ navigation }: Props) => {
  const [passphrase, setPassphrase] = useState<string>("");
  const [isBiometricLoginSupported, setIsBiometricLoginSupported] =
    useState(false);
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
    // Store it if the user enabled future biometric login.
    if (enableBiometryLogin) {
      await BiometricLogin.setStoredPassphrase(passphrase);
    }

    await onLoginSuccess();
  };

  const onLoginSuccess = async () => {
    navigation.replace("Tabs", { screen: "DiscoverScreen" });
    await Deeplink.openDelayedDeeplinkIfNeeded();
  };

  useEffect(() => {
    const biometricStartup = async () => {
      if (await BiometricLogin.login()) {
        await onLoginSuccess();
      } else {
        setIsBiometricLoginSupported(await BiometricLogin.isSupported());
      }
    };
    void biometricStartup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <KeyboardAvoidingView behavior={"padding"} style={FlexLayouts.wrapper}>
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
          {!!isBiometricLoginSupported && (
            <View style={styles.biometricLoginRow}>
              <Text style={FlexLayouts.wrapper}>Enable biometric login?</Text>
              <Switch
                onValueChange={setEnableBiometryLogin}
                value={enableBiometryLogin}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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