/**
 * This exposes the native ActionExtension module as a JS module.
 */
import { NativeModules } from "react-native";
import { EncodedPresentationSubmission } from "verite";
import { WalletRequest } from "./ActionExtensionTypes";
const { ActionExtension } = NativeModules;

interface ActionExtensionInterface {
  dismiss(): void;
  getWalletRequest(): Promise<WalletRequest>;
  sendPresentationSubmission(
    submission: EncodedPresentationSubmission
  ): Promise<void>;
}

export default ActionExtension as ActionExtensionInterface;
