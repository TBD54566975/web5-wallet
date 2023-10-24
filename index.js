import "@tbd54566975/web5-react-native-polyfills";
import "@/utils/globals";
import { registerRootComponent } from "expo";
import { polyfillBlob } from "./blob-polyfill";

if (!global.structuredClone) {
  global.structuredClone = require("realistic-structured-clone");
}

polyfillBlob();

import App from "./src/App";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
