import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ProfileManager } from "../profile/ProfileManager";

export const WelcomeScreen = ({ navigation }) => {
  const onPressImport = () => {
    console.warn("Import not implemented");
  };

  const onPressStartFresh = async () => {
    await ProfileManager.createProfile({
      name: "Personal",
      icon: "account-circle-outline",
      didMethod: "ion",
    });
    await ProfileManager.createProfile({
      name: "Social",
      icon: "pound",
      didMethod: "ion",
    });
    await ProfileManager.createProfile({
      name: "Career",
      icon: "briefcase-outline",
      didMethod: "ion",
    });

    navigation.replace("Tabs");
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="bodyLarge">
          First things first, let&apos;s get your identity setup. Are you
          importing your existing identity, or starting from scratch?
        </Text>
        <Button mode="contained" onPress={onPressImport}>
          Import
        </Button>
        <Button mode="contained" onPress={onPressStartFresh}>
          Start Fresh
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
