import React from "react";
import { StyleSheet, ScrollView, View, DevSettings } from "react-native";
import { useSelector } from "@legendapp/state/react";
import { Text, Button } from "react-native-paper";
import { MockIssuerUtils } from "../mock-issuer/utils";
import { profilesAtom } from "../profile/atoms";
import { CredentialList } from "./CredentialList";

export const CredentialScreen = ({ route }) => {
  // replace with route params once we have multiple profiles
  const navigatedProfile = useSelector(() => profilesAtom[0].get());

  const hasCredentials = useSelector(
    () => !!profilesAtom[0]?.credentials.get().length
  );

  const onPressGetCredentials = async () => {
    if (navigatedProfile) {
      const issuedCredentials = await MockIssuerUtils.issueCredentials(
        navigatedProfile?.didKey
      );
      const normalized = { ...issuedCredentials, id: String(Math.random()) };

      // there's only one profile until we add support for more profiles. so im not using the route params.
      profilesAtom[0].credentials.push(normalized);
    }
  };

  const onPressWipeState = async () => {
    profilesAtom.set([]);
    DevSettings.reload();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="titleMedium">
          Welcome, {navigatedProfile?.name + "\n\n"}
          Your DID ION is: {navigatedProfile?.didIon + "\n\n"}
          Your DID Key is: {navigatedProfile?.didKey?.id + "\n\n"}
        </Text>
        {hasCredentials && <CredentialList />}
        <Button mode="contained" onPress={onPressGetCredentials}>
          Apply for Credential
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
