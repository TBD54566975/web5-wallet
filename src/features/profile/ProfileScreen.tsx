import React from "react";
import { StyleSheet, ScrollView, View, DevSettings } from "react-native";
import { Text, Button, List } from "react-native-paper";
import { profilesAtom } from "./atoms";
import { For } from "@legendapp/state/react";

export const ProfilesScreen = ({ navigation }) => {
  const onPressCreateMoreProfiles = () => {
    navigation.navigate("CreateProfileScreen");
  };

  const onPressWipeState = async () => {
    profilesAtom.set([]);
    DevSettings.reload();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="titleMedium">
          Each profile contains your credentials
        </Text>
        <For each={profilesAtom}>
          {(profile) => {
            const profileData = profile?.get();
            if (!profileData) {
              return <></>;
            }

            return (
              <List.Item
                title={profileData.name}
                description={`Credentials stored: ${profileData.credentials.length}`}
                left={(props) => (
                  <List.Icon {...props} icon={profileData.icon} />
                )}
                onPress={() => {
                  navigation.navigate("CredentialScreen", {
                    name: profileData.name,
                  });
                }}
              />
            );
          }}
        </For>
        <Button mode="contained" onPress={onPressCreateMoreProfiles}>
          Create Another Profile
        </Button>
        <Button mode="contained" onPress={onPressWipeState}>
          Wipe State
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
