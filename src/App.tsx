import React from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { type LinkingOptions } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme } from "./theme/colors";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/features/app/store";

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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={DeepLinkConfig} theme={DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
