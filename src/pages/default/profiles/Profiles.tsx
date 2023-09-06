import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { userProfiles } from "@/services/profile.service";
import { Tappable } from "@/pages/default/Tappable";
import { For } from "@legendapp/state/react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { BadgeNames, ItemProps } from "@/components/Item";
import { formatDID } from "@/util/formatters";

const ProfilesScreen = ({ navigation }) => {
  const navigateToItem = (profile) => {
    navigation.navigate("ProfileDetail", { profile });
  };

  const navigateToAddProfile = () => {
    navigation.navigate("AddProfile");
  };

  return (
    <ParentPageLayout>
      <View style={FlexLayouts.containerButtonBottom}>
        <ScrollView>
          <For each={userProfiles}>
            {(userProfile) => {
              const profile = userProfile.get();
              if (!profile) {
                return <></>;
              }
              const options: ItemProps = {
                heading: profile.name,
                subtitle: profile.displayName,
                body: formatDID(profile.id),
                // TODO: Remove this type casting
                iconName: profile.icon as ItemProps["iconName"],
                badgeName: BadgeNames.PROFILE,
              };
              return (
                <Tappable
                  options={options}
                  onPress={() =>
                    navigateToItem({
                      ...profile,
                      dateCreated: String(profile.dateCreated),
                    })
                  }
                />
              );
            }}
          </For>
        </ScrollView>
        <Button kind="primary" onPress={navigateToAddProfile}>
          Create a new profile
        </Button>
      </View>
    </ParentPageLayout>
  );
};

export default ProfilesScreen;
