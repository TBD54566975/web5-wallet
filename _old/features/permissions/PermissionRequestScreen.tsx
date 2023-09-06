import React from "react";
import { Button, Text } from "react-native-paper";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { PermissionRequest } from "./PermissionRequest";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { URLUtils } from "../../utils/url";
import { Buffer } from "buffer";

type Params = {
  host: string;
  "x-source": string;
  "x-success": string;
  "x-error": string;
  req: string;
};

export const PermissionRequestScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const params: Params = route.params;
  const permissionRequest = PermissionRequest.fromBase64(params.req);

  const handleAccept = async () => {
    const successBaseURL = params["x-success"];
    const successURL = URLUtils.urlWithParams(successBaseURL, {
      // TODO: Build actual accept response instead of hard-coding
      resp: encodedAcceptResponse(),
    });

    navigation.goBack();
    const canOpen = await Linking.canOpenURL(successURL);
    if (canOpen) {
      await Linking.openURL(successURL);
    } else {
      console.error("Cannot launch successURL");
    }
  };

  const handleReject = async () => {
    const errorURL = params["x-error"];

    navigation.goBack();
    const canOpen = await Linking.canOpenURL(errorURL);
    if (canOpen) {
      await Linking.openURL(errorURL);
    } else {
      console.error("Cannot open errorURL");
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.contentBlock}>
          <Text variant="headlineMedium">From</Text>
          <Text variant="bodyLarge">{params.host}</Text>
          <Text variant="bodyLarge">
            {permissionRequest.descriptor.description}
          </Text>
        </View>

        <View style={styles.contentBlock}>
          <Text variant="bodyLarge">
            Granted by: {permissionRequest.descriptor.grantedBy}
          </Text>
          <Text variant="bodyLarge">
            Granted to: {permissionRequest.descriptor.grantedTo}
          </Text>
        </View>

        <View style={styles.contentBlock}>
          <Text variant="bodyLarge">
            Scope: {permissionRequest.descriptor.scope.interface}:
            {permissionRequest.descriptor.scope.method}
          </Text>
          <Text variant="bodySmall">
            Scope: {permissionRequest.descriptor.scope.schema}
          </Text>
        </View>

        <View style={styles.contentBlock}>
          <Text variant="bodyLarge">
            Payload: {permissionRequest.authorization.payload}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleAccept}
          style={styles.footerButton}
        >
          Accept
        </Button>
        <Button
          mode="contained-tonal"
          onPress={handleReject}
          style={styles.footerButton}
        >
          Reject
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  contentBlock: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
    padding: 10,
  },
  footerButton: {
    flex: 1,
  },
});

const encodedAcceptResponse = () => {
  return Buffer.from(
    `
    {
      "descriptor": {
        "interface": "Permissions",
        "method": "Grant",
        "permissionGrantId": "f45wve-5b56v5w-5657b4e-56gqf35v",
        "permissionRequestId": "b6464162-84af-4aab-aff5-f1f8438dfc1e",
        "grantedBy": "did:example:bob",
        "grantedTo": "did:example:carol",
        "expiry": 1575606941,
        "delegatedFrom": "PARENT_PERMISSION_GRANT",
        "scope": {
          "method": "RecordsWrite",
          "schema": "https://schema.org/MusicPlaylist",
          "recordId": "f45wve-5b56v5w-5657b4e-56gqf35v"
        },
        "conditions": {
          "delegation": true,
          "publication": true,
          "sharedAccess": true,
          "encryption": "optional",
          "attestation": "prohibited"
        }
      },
      "authorization": {
        "payload": "89f5hw458fhw958fq094j9jdq0943j58jfq09j49j40f5qj30jf",
        "signatures": [{
          "protected": "4d093qj5h3f9j204fq8h5398hf9j24f5q9h83402048h453q",
          "signature": "49jq984h97qh3a49j98cq5h38j09jq9853h409jjq09h5q9j4"
        }]
      },
      "encryptionKey": { 
        "protected": "protected",
        "recipients": "recipients",
        "ciphertext": "ciphertext",
        "iv": "iv",
        "tag": "tag"
      }
    }
    `
  ).toString("base64");
};
