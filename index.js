import "@tbd54566975/web5-react-native-polyfills";
import "./src/utils/globals";
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { polyfillBlob } from "./blob-polyfill";
import { Crypto } from "@peculiar/webcrypto";

if (!global.structuredClone) {
  global.structuredClone = require("realistic-structured-clone");
}

polyfillBlob();

global.crypto.subtle = new Crypto().subtle;

import { App } from "./src/App";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent("main", () => App);
