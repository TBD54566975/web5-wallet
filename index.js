import "@tbd54566975/web5-react-native-polyfills";
import { registerRootComponent } from "expo";
import { polyfillBlob } from "./blob-polyfill";

if (!global.structuredClone) {
  var structuredClone = require("realistic-structured-clone");
  global.structuredClone = structuredClone;
}

polyfillBlob();

import App from "./src/App";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
