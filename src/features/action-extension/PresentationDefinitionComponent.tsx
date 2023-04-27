import crypto from "crypto";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ActionExtension from "./ActionExtension";
import {
  buildPresentationSubmission,
  PresentationDefinition as pd,
  PresentationDefinition,
  randomDidKey,
  validateVerificationSubmission,
  Verifiable,
  W3CCredential,
} from "verite";
import { StorageService } from "../../config/storageService";
import { JsonComponent } from "./JsonComponent";

interface PresentationDefinitionComponentProps {
  pd: PresentationDefinition;
}

export const PresentationDefinitionComponent: React.FC<
  PresentationDefinitionComponentProps
> = ({ pd }) => {
  const onPressSendSubmission = async () => {
    // TODO: pull DID from local storage when available
    const didKey = randomDidKey(crypto.randomBytes);
    const credentials = StorageService.getObjectOrArray(
      "credentials"
    ) as Verifiable<W3CCredential>[];

    const jwt = await buildPresentationSubmission(didKey, pd, credentials);
    try {
      await ActionExtension.sendPresentationSubmission(jwt);
    } catch (e) {
      console.error("Error sending wallet response: " + e);
    }
  };

  const onPressDismiss = () => {
    ActionExtension.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Presentation Request</Text>
        <Text>VerifierApp has sent the following Presentation Request:</Text>
        <JsonComponent jsonObject={pd} />
      </ScrollView>
      <Button
        mode="contained"
        onPress={onPressSendSubmission}
        style={styles.button}
      >
        Send Presentation Submission
      </Button>
      <Button mode="outlined" onPress={onPressDismiss} style={styles.button}>
        Dismiss
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
  },
});
