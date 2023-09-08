import React, { useEffect, useState } from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { type LinkingOptions } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme } from "./theme/colors";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import LoadingScreen from "@/pages/Loading";

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
  const [startupComplete, setStartupComplete] = useState(false);

  useEffect(() => {
    const startupTasks = async () => {
      await IdentityAgentManager.initAgent();
      setStartupComplete(true);
    };
    void startupTasks();
  }, []);

  if (!startupComplete) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer linking={DeepLinkConfig} theme={DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
