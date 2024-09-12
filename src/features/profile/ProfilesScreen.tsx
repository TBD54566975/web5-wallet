import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Loader } from "../../components/Loader";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import type { TabNavigatorProps } from "../../types/navigation";
import { formatDID } from "../../utils/formatters";
import { useProfilesQuery } from "./hooks";
import { Button } from "../../components/Button";
import type { Profile } from "../../types/models";

type Props = TabNavigatorProps<"ProfilesScreen">;

export const ProfilesScreen = ({ navigation }: Props) => {
  const profileQueries = useProfilesQuery();
  const isLoading = profileQueries.some((result) => result.isLoading);

  const navigateToProfile = (profile: Profile) => {
    navigation.navigate("ProfileDetailScreen", { profile });
  };

  const navigateToAddProfile = () => {
    navigation.navigate("AddProfileScreen");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          {profileQueries.map(({ data: profile }) => {
            return profile ? (
              <Tappable
                key={profile.did}
                iconName="hash"
                heading={profile.name}
                body={formatDID(profile.did)}
                onPress={() => navigateToProfile(profile)}
              />
            ) : null;
          })}
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
