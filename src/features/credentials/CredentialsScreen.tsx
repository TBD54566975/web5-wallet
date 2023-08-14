import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export const CredentialsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Credentials Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
