import React, { useMemo } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { For } from "@legendapp/state/react";
import { Text, Button } from "react-native-paper";
import { MockIssuerUtils } from "../mock-issuer/utils";
import { profilesAtom } from "../profile/atoms";
import { Verifiable, W3CCredential } from "verite";
import { CredentialCard } from "./CredentialCard";

export const CredentialScreen = ({ route }) => {
  const navigatedProfile = useMemo(() => {
    return profilesAtom.find(
      (profile) => profile.name.peek() === route.params.name
    );
  }, []);

  const onPressGetCredentials = async () => {
    const did = navigatedProfile?.did.peek();

    if (did) {
      // create the mock credential
      const issuedCredentials = await MockIssuerUtils.issueCredentials(did);

      // assign a random uuid for the credential because verite isnt doing it
      const normalizedCredential = {
        ...issuedCredentials,
        id: String(Math.random()),
      };

      // push the new credential to state
      navigatedProfile?.credentials.push(normalizedCredential);
    }
  };

  const extractPrettyData = (credential: Verifiable<W3CCredential>) => {
    for (const [key, values] of Object.entries(credential?.credentialSubject)) {
      if (key !== "id") {
        const type = values.type;
        const date = new Date(values.approvalDate).toLocaleString();
        const issuer =
          Math.floor(Math.random() * 2) % 2 === 0
            ? "Silicon Valley Bank"
            : "FTX Inc.";
        return { type, date, issuer };
      }
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="titleMedium">
          Welcome, {navigatedProfile?.name?.peek() + "\n\n"}
          Your DID is: {navigatedProfile?.did?.id?.peek() + "\n\n"}
        </Text>
        <For optimized each={navigatedProfile?.credentials}>
          {(cred) => {
            const { type, date, issuer } = extractPrettyData(cred.peek()!)!;

            return <CredentialCard type={type} date={date} issuer={issuer} />;
          }}
        </For>
        <Button mode="contained" onPress={onPressGetCredentials}>
          Apply for Credential
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
