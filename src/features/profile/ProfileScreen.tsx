import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import crypto from "crypto";
import { DID, generateKeyPair } from "@decentralized-identity/ion-tools";
import { Text, Button, TextInput } from "react-native-paper";
import { randomDidKey } from "verite";
import { didStore } from "./store";

export const ProfileScreen = (props) => {
  const [profileInput, setProfileInput] = useState("");

  const onPressCreateProfile = async () => {
    didStore.didIon = await createDidIon();
    didStore.didKey = createDidKey();

    props.navigation.navigate("CredentialScreen", {
      name: profileInput,
    });
  };

  const createDidIon = async () => {
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

  const createDidKey = () => {
    const didKey = randomDidKey(crypto.randomBytes);

    return didKey;
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
