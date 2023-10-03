import { Linking } from "react-native";
import { type LinkingOptions } from "@react-navigation/native";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";

let delayedDeeplink: string | null = null;

const config: LinkingOptions<any> = {
  prefixes: ["web5://"],
  filter: (url) => {
    // Do not handle any deeplinks until the IdentityAgent has been started.
    // If a deeplink comes in before the agent has been started, delay handling
    // it until the user has fully started the agent by enterin their passphrase.
    const isAgentStarted = IdentityAgentManager.isAgentStarted();
    if (!isAgentStarted) {
      delayedDeeplink = url;
    }
    return isAgentStarted;
  },
  config: {
    screens: {
      ConnectionRequestScreen: ":host/permission",
    },
  },
};

const openDelayedDeeplinkIfNeeded = async () => {
  if (delayedDeeplink) {
    await Linking.openURL(delayedDeeplink);
    delayedDeeplink = null;
  }
};

export const Deeplink = {
  config,
  openDelayedDeeplinkIfNeeded,
};
