import React from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { AppNavigator } from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme } from "./theme/colors";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/features/app/store";
import { Deeplink } from "@/features/deeplink/deeplink";

enableLegendStateReact();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={Deeplink.config} theme={DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
