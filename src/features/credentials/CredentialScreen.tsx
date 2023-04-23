import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";

export const CredentialScreen = ({ route }) => {
  const onPressGetCredentials = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text variant="titleMedium">
        Welcome, {route.params.name}. Your DID is: {route.params.did}. Click the
        below button to apply for credentials.
      </Text>
      <Button mode="contained" onPress={onPressGetCredentials}>
        Apply for Credentials
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
