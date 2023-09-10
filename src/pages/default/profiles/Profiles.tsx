import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Tappable } from "@/pages/default/Tappable";
import { For } from "@legendapp/state/react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { BadgeNames } from "@/components/Item";
import { formatDID } from "@/util/formatters";
import { profilesAtom } from "@/features/identity/atoms";
import { Profile } from "@/types/models";
import { TabNavigatorProps } from "@/types/navigation";

type Props = TabNavigatorProps<"ProfilesScreen">;
const ProfilesScreen = ({ navigation }: Props) => {
  const navigateToItem = (profile: Profile) => {
    navigation.navigate("ProfileDetailScreen", { profile });
  };

  const navigateToAddProfile = () => {
    navigation.navigate("AddProfileScreen");
  };

  return (
    <ParentPageLayout>
      <View style={FlexLayouts.containerButtonBottom}>
        <ScrollView>
          <For each={profilesAtom}>
            {(userProfile) => {
              const profile = userProfile.get();
              if (!profile) {
                return <></>;
              }

              return (
                <Tappable
                  iconName={profile.icon}
                  badgeName={BadgeNames.PROFILE}
                  heading={profile.name}
                  subtitle={profile.displayName}
                  body={formatDID(profile.id)}
                  onPress={() => navigateToItem(profile)}
                />
              );
            }}
          </For>
        </ScrollView>
        <Button
          kind="primary"
          onPress={navigateToAddProfile}
          text="Create a new profile"
        />
      </View>
    </ParentPageLayout>
  );
};

export default ProfilesScreen;
