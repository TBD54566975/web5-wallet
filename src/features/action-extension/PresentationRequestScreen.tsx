import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { buildPresentationSubmission, randomDidKey } from "verite";
import ActionExtension from "./ActionExtension";
import { JsonComponent } from "./JsonComponent";
import { profilesAtom } from "../profile/atoms";
import type { ActionExtensionStackParamList } from "../../navigation/ActionExtensionNavigator";
import { StorageService } from "../../config/storageService";

type PresentationRequestScreenRouteProp = RouteProp<
  ActionExtensionStackParamList,
  "PresentationRequestScreen"
>;

interface Props {
  route: PresentationRequestScreenRouteProp;
}

export const PresentationRequestScreen = ({ route }: Props) => {
  const { pd } = route.params;

  const onPressSendSubmission = async () => {
    // TODO: Handle multiple Profiles? Would probably need a selection UI?
    const didKey = profilesAtom[0].didKey.get();

    /**
     * TODO: Replace with keychain stuff
     * The privatekey is not serializable so this is just a quick hack for our hack that will get replaced down the road
     * This wont be compatible with multiple profiles but thats ok because its just a mock anyways
     */
    const buf = StorageService.getBuffer("privateKey")!;
    didKey.privateKey = buf;

    const credentials = profilesAtom[0].get().credentials;

    if (!credentials) {
      console.warn("Wallet Credentials not found. Check state or persistence.");
      return;
    }

    const jwt = await buildPresentationSubmission(didKey, pd, credentials);
    try {
      await ActionExtension.sendPresentationSubmission(jwt);
    } catch (e) {
      console.warn("Error sending wallet response: " + e);
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
