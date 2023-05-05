import "./src/config/polyfills";
import "fastestsmallesttextencoderdecoder";
import { AppRegistry } from "react-native";

import { ActionExtensionEntry } from "./src/features/action-extension/ActionExtensionEntry";

AppRegistry.registerComponent("ActionExtension", () => ActionExtensionEntry);
