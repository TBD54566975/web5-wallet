import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import type { AppNavigatorProps } from "../../types/navigation";
import { Input } from "../../components/Input";

type Props = AppNavigatorProps<"CreateProfilesScreen">;

export const CreateProfilesScreen = ({ navigation }: Props) => {
  const [profileName, setProfileName] = useState<string>("");
  const [dwnEndpoint, setDwnEndpoint] = useState<string>(
    "http://dwn.tbddev.org/beta"
  );

  const onNextTapped = () => {
    navigation.navigate("CreatePassphraseScreen", { profileName, dwnEndpoint });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={Typography.paragraph2}>
          A profile is a version of yourself online. When you connect to an app,
          you&apos;ll pick which profile to connect.
        </Text>
        <Text style={Typography.paragraph2}>
          Like email addresses, profiles are separate and not connected to one
          another.
        </Text>
        <Text style={Typography.paragraph2}>
          You can always create, delete, and edit profiles later.
        </Text>
      </View>
      <View>
        <Text style={Typography.paragraph2}>Name your profile:</Text>
        <Input
          label=""
          value={profileName}
          onChangeText={setProfileName}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View>
        <Text style={Typography.paragraph2}>Dwn Endpoint:</Text>
        <Input
          label="Dwn Endpoint"
          value={dwnEndpoint}
          onChangeText={setDwnEndpoint}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Button kind="primary" onPress={onNextTapped} text="Next" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACE.BASE,
    flex: 1,
    gap: SPACE.LARGE,
  },
});
