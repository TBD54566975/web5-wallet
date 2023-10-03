import React from "react";
import { ParentPageLayout } from "@/components/ParentPageLayout";
import { Tappable } from "@/components/Tappable";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { formatDID } from "@/util/formatters";
import { TabNavigatorProps } from "@/types/navigation";
import type { ManagedIdentity } from "@web5/agent";
import LoadingScreen from "@/components/Loading";
import { useProfiles } from "@/features/profile/hooks";
import { useIdentityList } from "@/features/identity/hooks";

type Props = TabNavigatorProps<"ProfilesScreen">;

const ProfilesScreen = ({ navigation }: Props) => {
  const { data: allIdentities, isLoading: isLoadingIdentities } =
    useIdentityList();

  const profileQueries = useProfiles(allIdentities ?? [], {
    enabled: allIdentities !== undefined,
  });
  const isLoadingProfiles = profileQueries.some((result) => result.isLoading);

  const navigateToProfile = (identity: ManagedIdentity) => {
    navigation.navigate("ProfileDetailScreen", { identity });
  };

  const navigateToAddProfile = () => {
    navigation.navigate("AddProfileScreen");
  };

  if (isLoadingIdentities || isLoadingProfiles) {
    return <LoadingScreen />;
  }

  return (
    <ParentPageLayout>
      <View style={FlexLayouts.containerButtonBottom}>
        <ScrollView>
          {profileQueries.map(({ data: profile }) =>
            profile ? (
              <Tappable
                key={profile.did}
                iconName="hash"
                heading={profile.name}
                subtitle={profile.displayName}
                body={formatDID(profile.did)}
                onPress={() => navigateToProfile(profile)}
              />
            ) : null
          )}
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
