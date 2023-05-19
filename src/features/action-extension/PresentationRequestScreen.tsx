import crypto from "crypto";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ActionExtension from "./ActionExtension";
import {
  buildPresentationSubmission,
  PresentationDefinition as pd,
  randomDidKey,
  Verifiable,
  W3CCredential,
} from "verite";
import { StorageService } from "../../config/storageService";
import { JsonComponent } from "./JsonComponent";
import { RouteProp } from "@react-navigation/native";
import { ActionExtensionStackParamList } from "../../navigation/ActionExtensionNavigator";

type PresentationRequestScreenRouteProp = RouteProp<
  ActionExtensionStackParamList,
  "PresentationRequestScreen"
>;

interface Props {
  route: PresentationRequestScreenRouteProp;
}

export const PresentationRequestScreen: React.FC<Props> = ({
  route,
}: Props) => {
  const { pd } = route.params;

  const onPressSendSubmission = async () => {
    // TODO: pull DID from local storage when available
    const didKey = randomDidKey(crypto.randomBytes);
    const credentials =
      StorageService.getObjectOrArray<Verifiable<W3CCredential>[]>(
        "credentials"
      );

    if (!credentials) return;

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
        <Text variant="titleMedium" style={styles.description}>
          VerifierApp has sent the following Presentation Request:
        </Text>
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
  description: {
    paddingTop: 10,
  },
  button: {
    marginVertical: 5,
  },
});
