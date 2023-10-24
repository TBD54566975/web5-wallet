import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Tappable } from "@/components/Tappable";
import { Button } from "@/components/Button";
import { SPACE } from "@/theme/layouts";
import { formatDID } from "@/utils/formatters";
import { TabNavigatorProps } from "@/types/navigation";
import type { ManagedIdentity } from "@web5/agent";
import Loader from "@/components/Loader";
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
    return <Loader />;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
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
          <Button
            kind="primary"
            onPress={navigateToAddProfile}
            text="Create a new profile"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
});

export default ProfilesScreen;
