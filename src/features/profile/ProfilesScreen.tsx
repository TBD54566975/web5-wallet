import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { ManagedIdentity } from "@web5/agent";
import { Loader } from "../../components/Loader";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import type { TabNavigatorProps } from "../../types/navigation";
import { formatDID } from "../../utils/formatters";
import { useIdentityListQuery } from "../identity/hooks";
import { useProfilesQuery } from "./hooks";
import { Button } from "../../components/Button";

type Props = TabNavigatorProps<"ProfilesScreen">;

export const ProfilesScreen = ({ navigation }: Props) => {
  const { data: allIdentities, isLoading: isLoadingIdentities } =
    useIdentityListQuery();

  // TODO: abstract to RQ
  const profileQueries = useProfilesQuery(allIdentities ?? []);
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
