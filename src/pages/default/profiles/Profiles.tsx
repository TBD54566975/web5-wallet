import React, { useEffect, useState } from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Tappable } from "@/pages/default/Tappable";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { formatDID } from "@/util/formatters";
import { Profile } from "@/types/models";
import { TabNavigatorProps } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { type ManagedIdentity } from "@web5/agent";

type Props = TabNavigatorProps<"ProfilesScreen">;
const ProfilesScreen = ({ navigation }: Props) => {
  const [managedIdentities, setManagedIdentities] = useState<ManagedIdentity[]>(
    []
  );

  const navigateToItem = (profile: Profile) => {
    navigation.navigate("ProfileDetailScreen", { profile });
  };

  const navigateToAddProfile = () => {
    navigation.navigate("AddProfileScreen");
  };

  useEffect(() => {
    const fetchManagedIdentities = async () => {
      // console.log("Fetching managedIdentities!");
      // const managedIdentities =
      //   await IdentityAgentManager.getAgent().identityManager.list();
      // console.log(
      //   "Fetched managedIdentities:",
      //   JSON.stringify(managedIdentities)
      // );
      // setManagedIdentities(managedIdentities);
    };

    void fetchManagedIdentities();
  }, []);

  return (
    <ParentPageLayout>
      <View style={FlexLayouts.containerButtonBottom}>
        <ScrollView>
          {managedIdentities.map((identity) => (
            <Tappable
              key={identity.did}
              iconName="hash"
              heading={identity.name}
              body={formatDID(identity.did)}
              onPress={() => console.log("tapped", identity.name)}
            />
          ))}
          {/* <For each={profilesAtom}>
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
          </For> */}
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
