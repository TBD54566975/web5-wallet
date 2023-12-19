import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIdentityListQuery } from "../identity/hooks";

export const OIDCScreen = () => {
  const { data: identities } = useIdentityListQuery();
  NOOP(identities);

  return <SafeAreaView style={styles.wrapper}></SafeAreaView>;
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
