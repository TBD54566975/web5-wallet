import React, { useState } from "react";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppNavigatorProps } from "@/types/navigation";

// Minimum number of characters that are required for a password to be considered valid
const MIN_PASSPHRASE_LENGTH = 3;

type Props = AppNavigatorProps<"CreatePassphraseScreen">;

const CreatePassphraseScreen = ({ navigation }: Props) => {
  const [passphrase, setPassphrase] = useState<string>("");

  const isPassphraseValid = passphrase?.length >= MIN_PASSPHRASE_LENGTH;

  const nextTapped = () => {
    navigation.navigate("CreatingWalletScreen", { passphrase });
  };

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.containerVerticalCenter]}>
        <View style={Layouts.row}>
          <Text style={Typography.heading3}>
            Next up, let&apos;s create your passphrase
          </Text>
        </View>
        <View style={Layouts.row}>
          <Text style={Typography.paragraph2}>
            You will use your passphrase to login when you launch the app.
          </Text>
          <Text style={Typography.paragraph2}>
            Make sure it&apos;s memorable, and strong!
          </Text>
        </View>
        <View style={Layouts.row}>
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
          />
        </View>
        <Button
          kind={isPassphraseValid ? "primary" : "disabled"}
          text="Next"
          onPress={nextTapped}
          disabled={!isPassphraseValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePassphraseScreen;
