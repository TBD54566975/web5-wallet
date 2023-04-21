import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DID, generateKeyPair } from "@decentralized-identity/ion-tools";
import PolyfillCrypto from "react-native-webview-crypto";

// async function testDidION() {
//   // Generate keys and ION DID
//   let authnKeys = await generateKeyPair();
//   let did = new DID({
//     content: {
//       publicKeys: [
//         {
//           id: "key-1",
//           type: "EcdsaSecp256k1VerificationKey2019",
//           publicKeyJwk: authnKeys.publicJwk,
//           purposes: ["authentication"],
//         },
//       ],
//       services: [
//         {
//           id: "domain-1",
//           type: "LinkedDomains",
//           serviceEndpoint: "https://foo.example.com",
//         },
//       ],
//     },
//   });
//   console.log(authnKeys);
//   let longFormURI = await did.getURI();
//   let shortFormURI = await did.getURI("short");
// }

export default function App() {
  return (
    <View style={styles.container}>
      <PolyfillCrypto />
      <Text>Web5 Wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
