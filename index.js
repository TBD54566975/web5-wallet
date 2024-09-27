import "@tbd54566975/web5-react-native-polyfills";
import "./src/utils/globals";
import "react-native-gesture-handler";
import { AppRegistry, LogBox } from "react-native";
import { App } from "./src/App";

if (__DEV__) {
  LogBox.ignoreLogs([
    "`useBottomSheetDynamicSnapPoints` will be deprecated",
    "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.",
    "Sync failed: Error: Failed to dereference",
  ]);
}

if (!__DEV__) disableConsole();

const disableConsole = () => {
  console.log = NOOP;
  console.info = NOOP;
  console.debug = NOOP;
  console.warn = NOOP;
  console.error = NOOP;
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent("main", () => App);
