import "@tbd54566975/web5-react-native-polyfills";
import "./src/utils/globals";
import "react-native-gesture-handler";
import { AppRegistry, LogBox } from "react-native";
import { polyfillBlob } from "./blob-polyfill";
import { Crypto } from "@peculiar/webcrypto";

if (!global.structuredClone) {
  global.structuredClone = require("realistic-structured-clone");
}

polyfillBlob();

global.crypto.subtle = new Crypto().subtle;

if (__DEV__) {
  LogBox.ignoreLogs([
    "`useBottomSheetDynamicSnapPoints` will be deprecated",
    "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.",
  ]);
}

import { App } from "./src/App";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent("main", () => App);
