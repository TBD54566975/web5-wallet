import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { MockIssuerUtils } from "../mock-issuer/utils";
import { StorageService } from "../../config/storageService";
import { CredentialCard } from "./CredentialCard";
import { profilesAtom } from "../profile/atoms";
import type { Verifiable, W3CCredential } from "verite";
import type { PrettyCredential } from "../../types/models";

export const CredentialScreen = ({ route }) => {
  const [credentials, setCredentials] = useState<Verifiable<W3CCredential>[]>(
    []
  );
  const [prettyFields, setPrettyFields] = useState<PrettyCredential[]>([]);

  useEffect(() => {
    StorageService.setObjectOrArray("credentials", credentials);
  }, [credentials]);

  const navigatedProfile = useMemo(
    () =>
      profilesAtom.profiles
        .peek()
        .find((profile) => profile.name === route.params.name),
    []
  );

  const onPressGetCredentials = async () => {
    if (navigatedProfile) {
      const issuedCredentials = await MockIssuerUtils.issueCredentials(
        navigatedProfile?.didKey
      );

      setCredentials((previousCredentials) => [
        ...previousCredentials,
        issuedCredentials,
      ]);

      // derive some nicely formatted data
      const prettyFields = extractPrettyData(issuedCredentials);

      if (prettyFields) {
        setPrettyFields((previousFields) => [...previousFields, prettyFields]);
      }
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

  const hasCredentials = !!credentials.length;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="titleMedium">
          Welcome, {navigatedProfile?.name + "\n\n"}
          Your DID ION is: {navigatedProfile?.didIon + "\n\n"}
          Your DID Key is: {navigatedProfile?.didKey?.id + "\n\n"}
        </Text>
        {hasCredentials && (
          <>
            {prettyFields?.map((cred, index) => (
              <CredentialCard
                key={index}
                type={cred.type}
                date={cred.date}
                issuer={cred.issuer}
              />
            ))}
          </>
        )}
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
