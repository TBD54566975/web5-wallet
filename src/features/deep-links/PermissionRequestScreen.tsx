import React from "react";
import { Button, Text } from "react-native-paper";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { PermissionRequest } from "./permission-request";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    const successUrl = createUrlWithParams(params["x-success"], {
      resp: encodedAcceptResponse(),
    });

    navigation.pop();
    if (await Linking.canOpenURL(successUrl)) {
      Linking.openURL(successUrl);
    } else {
      console.error("Cannot launch successUrl");
    }
  };

  const handleReject = async () => {
    const errorUrl = params["x-error"];

    navigation.pop();
    if (await Linking.canOpenURL(errorUrl)) {
      Linking.openURL(errorUrl);
    } else {
      console.error("Cannot open errorUrl");
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <Text variant="headlineMedium">From</Text>
        <Text variant="bodyLarge">{params.host}</Text>

        <Text variant="bodyLarge">
          {permissionRequest.descriptor.description}
        </Text>
        <Text variant="bodyLarge">
          Granted by: {permissionRequest.descriptor.grantedBy}
        </Text>
        <Text variant="bodyLarge">
          Granted to: {permissionRequest.descriptor.grantedTo}
        </Text>
        <Text variant="bodyLarge">
          Scope: {permissionRequest.descriptor.scope.interface}:
          {permissionRequest.descriptor.scope.method}
        </Text>
        <Text variant="bodySmall">
          Scope: {permissionRequest.descriptor.scope.schema}
        </Text>
        <Text variant="bodyLarge">
          Payload: {permissionRequest.authorization.payload}
        </Text>
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
  },
  scrollViewContainer: {
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

function createUrlWithParams(
  baseUrl: string,
  params: { [key: string]: string }
): string {
  let queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${baseUrl}?${queryString}`;
}
