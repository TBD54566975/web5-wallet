import React, { useEffect } from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { type LinkingOptions } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { DwnManger } from "./features/dwn/DwnManager";
import { bootstrapIdentityAgent } from "./features/identity/identity-agent";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme } from "./theme/colors";

enableLegendStateReact();

const DeepLinkConfig: LinkingOptions<any> = {
  prefixes: ["web5://"],
  config: {
    screens: {
      PermissionRequestScreen: ":host/permission",
    },
  },
};

const App = () => {
  useEffect(() => {
    const startupTasks = async () => {
      await DwnManger.initExpoLevelDwn();
      await bootstrapIdentityAgent(
        "passphrase",
        "Personal",
        DwnManger.getDwn()
      );
    };
    void startupTasks();
  }, []);

  return (
    <NavigationContainer linking={DeepLinkConfig} theme={DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
