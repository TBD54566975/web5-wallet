import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Input } from "../../components/Input";
import { useMount } from "../../hooks/useMount";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { AppNavigatorProps } from "../../types/navigation";
import { Deeplink } from "../app/deeplink";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import { BiometricLogin } from "./biometric-login";
import { Button } from "../../components/Button";

type Props = AppNavigatorProps<"EnterPassphraseScreen">;

export const EnterPassphraseScreen = ({ navigation }: Props) => {
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

  useMount(() => {
    const biometricStartup = async () => {
      if (await BiometricLogin.login()) {
        await onLoginSuccess();
      } else {
        setIsBiometricLoginSupported(await BiometricLogin.isSupported());
      }
    };
    void biometricStartup();
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={Typography.heading1}>Enter your passphrase</Text>
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
            secureTextEntry={true}
          />
          <Button
            kind={isLoginButtonDisabled ? "disabled" : "primary"}
            text="Login"
            onPress={loginTapped}
            disabled={isLoginButtonDisabled}
          />
          {!!isBiometricLoginSupported && (
            <View style={styles.biometricLoginRow}>
              <Text style={styles.wrapper}>Enable biometric login?</Text>
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
  wrapper: { flex: 1 },
  container: {
    margin: SPACE.BASE,
    flex: 1,
    justifyContent: "center",
    gap: SPACE.BASE,
  },
  biometricLoginRow: {
    flexDirection: "row",
  },
});
