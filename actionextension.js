import "./src/config/polyfills";
import "fastestsmallesttextencoderdecoder";
import { AppRegistry } from "react-native";

import { ActionExtensionScreen } from "./src/features/action-extension/ActionExtensionScreen";

AppRegistry.registerComponent("ActionExtension", () => ActionExtensionScreen);
