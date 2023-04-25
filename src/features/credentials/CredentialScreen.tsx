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
        Welcome, {route.params.name + "\n\n"}
        Your DID ION is: {route.params.didIon + "\n\n"}
        Your DID Key is: {route.params.didKey + "\n\n"}
        Click the below button to apply for credentials.
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
