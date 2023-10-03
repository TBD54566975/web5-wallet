import { Button } from "@/components/Button";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Item } from "@/components/Item";
import type { AppNavigatorProps } from "@/types/navigation";
import { defaultIdentities } from "@/features/identity/default-identities";

type Props = AppNavigatorProps<"CreateProfilesScreen">;

const CreateProfilesScreen = ({ navigation }: Props) => {
  const onNextTapped = () => {
    navigation.navigate("CreatePassphraseScreen");
  };

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.containerVerticalCenter]}>
        <View style={Layouts.row}>
          <Text style={Typography.heading3}>
            We&apos;ll create 2 profiles for you to get started
          </Text>
        </View>
        <View style={Layouts.row}>
          <Text style={Typography.paragraph2}>
            A profile is a version of yourself online. When you connect to an
            app, you&apos;ll pick which profile to connect.
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
          <View key={index} style={Layouts.row}>
            <Item
              heading={identityProps.name}
              subtitle={identityProps.displayName}
              iconName={identityProps.icon}
            />
          </View>
        ))}
        <Button kind="primary" onPress={onNextTapped} text="Next" />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfilesScreen;
