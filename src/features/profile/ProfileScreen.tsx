import { DID, generateKeyPair } from "@decentralized-identity/ion-tools";
import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Button, TextInput } from "react-native-paper";

export const ProfileScreen = (props) => {
  const [profileInput, setProfileInput] = useState("");

  const onPressCreateProfile = async () => {
    const did = await createDID();

    props.navigation.navigate("CredentialScreen", {
      did: did,
      name: profileInput,
    });
  };

  const createDID = async () => {
    const authnKeys = await generateKeyPair();
    const did = new DID({
      content: {
        publicKeys: [
          {
            id: "key-1",
            type: "EcdsaSecp256k1VerificationKey2019",
            publicKeyJwk: authnKeys.publicJwk,
            purposes: ["authentication"],
          },
        ],
        services: [
          {
            id: "domain-1",
            type: "LinkedDomains",
            serviceEndpoint: "https://foo.example.com",
          },
        ],
      },
    });

    const shortFormURI: string = await did.getURI("short");

    return shortFormURI;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text variant="titleMedium">
        Welcome to wallet. To continue, please create a profile.
      </Text>
      <TextInput
        value={profileInput}
        label="Username"
        onChangeText={setProfileInput}
        mode="outlined"
      />
      <Button mode="contained" onPress={onPressCreateProfile}>
        Create Profile
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
