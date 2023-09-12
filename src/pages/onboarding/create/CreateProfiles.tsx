import { Button } from "@/components/Button";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { ProfileManager } from "@/features/identity/ProfileManager";
import { Item } from "@/components/Item";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"CreateProfilesScreen">;

const CreateProfilesScreen = ({ navigation }: Props) => {
  const finishCreateProfile = async () => {
    try {
      await ProfileManager.createProfile(seedProfiles.social);
      await ProfileManager.createProfile(seedProfiles.professional);
      navigation.navigate("Tabs", { screen: "DiscoverScreen" });
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Error",
        "Error creating wallet. Close this dialog and try again.",
        [
          {
            text: "OK, close",
            onPress: () => navigation.replace("WelcomeScreen"),
          },
        ]
      );
    }
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
        <View style={Layouts.row}>
          <Item
            heading={seedProfiles.social.name}
            subtitle={seedProfiles.social.displayName}
            iconName={seedProfiles.social.icon}
          />
        </View>
        <View style={Layouts.row}>
          <Item
            heading={seedProfiles.professional.name}
            subtitle={seedProfiles.social.displayName}
            iconName={seedProfiles.professional.icon}
          />
        </View>
        <Button kind="primary" onPress={finishCreateProfile} text="Next" />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfilesScreen;

const seedProfiles: Record<
  string,
  {
    name: string;
    icon: keyof typeof Octicons.glyphMap;
    didMethod: "ion" | "key";
    displayName: string;
  }
> = {
  social: {
    name: "My social profile",
    icon: "hash",
    didMethod: "ion",
    displayName: "Alex Aardvark",
  },
  professional: {
    name: "My professional profile",
    icon: "briefcase",
    didMethod: "ion",
    displayName: "Alex Aardvark",
  },
};
