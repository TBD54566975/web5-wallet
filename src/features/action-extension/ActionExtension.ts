/**
 * This exposes the native ActionExtension module as a JS module.
 */
import { NativeModules } from "react-native";
import { WalletRequest } from "./WalletRequestTypes";
const { ActionExtension } = NativeModules;

interface ActionExtensionInterface {
  dismiss(): void;
  getWalletRequest(): Promise<WalletRequest>;
}

export default ActionExtension as ActionExtensionInterface;
