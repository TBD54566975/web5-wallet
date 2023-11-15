import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Input } from "../../components/Input";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { AppNavigatorProps } from "../../types/navigation";
import { Button } from "../../components/Button";

// Minimum number of characters that are required for a password to be considered valid
const MIN_PASSPHRASE_LENGTH = 3;

type Props = AppNavigatorProps<"CreatePassphraseScreen">;

export const CreatePassphraseScreen = ({ navigation }: Props) => {
  const [passphrase, setPassphrase] = useState<string>("");

  const isPassphraseValid = passphrase?.length >= MIN_PASSPHRASE_LENGTH;

  const nextTapped = () => {
    navigation.navigate("CreateWalletScreen", { passphrase });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={Typography.heading3}>
            Next up, let&apos;s create your passphrase
          </Text>
          <Text style={Typography.paragraph2}>
            You will use your passphrase to login when you launch the app.
          </Text>
          <Text style={Typography.paragraph2}>
            Make sure it&apos;s memorable, and strong!
          </Text>
          <Input
            label=""
            nativeID="passphrase"
            placeholder={"Passphrase"}
            value={passphrase}
            onChangeText={setPassphrase}
            autoComplete="new-password"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            secureTextEntry={true}
          />
          <Button
            kind={isPassphraseValid ? "primary" : "disabled"}
            text="Next"
            onPress={nextTapped}
            disabled={!isPassphraseValid}
          />
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
    gap: SPACE.LARGE,
  },
});
