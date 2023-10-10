import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Item } from "@/components/Item";
import { defaultIdentities } from "@/features/identity/default-identities";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"CreateProfilesScreen">;

const CreateProfilesScreen = ({ navigation }: Props) => {
  const onNextTapped = () => {
    navigation.navigate("CreatePassphraseScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={Typography.heading3}>
          We&apos;ll create 2 profiles for you to get started
        </Text>
      </View>
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
      {defaultIdentities.map((identityProps, index) => (
        <View key={index}>
          <Item
            heading={identityProps.name}
            subtitle={identityProps.displayName}
            iconName={identityProps.icon}
          />
        </View>
      ))}
      <Button kind="primary" onPress={onNextTapped} text="Next" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACE.BASE,
    flex: 1,
    justifyContent: "center",
    gap: SPACE.LARGE,
  },
});

export default CreateProfilesScreen;
