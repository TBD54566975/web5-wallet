import React from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { type LinkingOptions } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
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
  return (
    <NavigationContainer linking={DeepLinkConfig} theme={DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
