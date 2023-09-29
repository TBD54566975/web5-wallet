import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { enableLegendStateReact } from "@legendapp/state/react";
import { AppNavigator } from "./navigation/AppNavigator";
import { DefaultTheme } from "./theme/colors";
import { queryClient } from "@/features/app/store";
import { Deeplink } from "@/features/deeplink/deeplink";

enableLegendStateReact();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={Deeplink.config} theme={DefaultTheme}>
        <KeyboardProvider>
          <AppNavigator />
        </KeyboardProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
