import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { type Verifiable, type W3CCredential } from "verite";
import { didStore } from "../profile/store";
import { MockIssuerUtils } from "../mock-issuer/utils";
import { StorageService } from "../../config/storageService";

export const CredentialScreen = ({ route }) => {
  const [credentials, setCredentials] = useState<Verifiable<W3CCredential>>();

  const onPressGetCredentials = async () => {
    const issued = await MockIssuerUtils.issueCredentials(didStore?.didKey!);
    setCredentials(issued);
    StorageService.setObjectOrArray("credentials", issued);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="titleMedium">
          Welcome, {route.params.name + "\n\n"}
          Your DID ION is: {didStore.didIon + "\n\n"}
          Your DID Key is: {didStore?.didKey?.id + "\n\n"}
          Click the below button to apply for credentials.
        </Text>
        {!!credentials ? (
          <Text variant="titleMedium">
            Credentials are {JSON.stringify(credentials)}
          </Text>
        ) : (
          <Button mode="contained" onPress={onPressGetCredentials}>
            Get Credentials
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
