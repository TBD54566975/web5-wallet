import React, { useState } from "react";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"EnterPassphraseScreen">;

const EnterPassphraseScreen = ({ navigation }: Props) => {
  const [passphrase, setPassphrase] = useState<string>("");

  const isPassphraseValid = passphrase?.length >= 0;

  const nextTapped = () => {
    navigation.navigate("CreateProfilesScreen");
  };

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
          kind={isPassphraseValid ? "primary" : "disabled"}
          text="Next"
          onPress={nextTapped}
          disabled={!isPassphraseValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default EnterPassphraseScreen;
