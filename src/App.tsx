import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AppNavigator } from "./navigation/AppNavigator";
import { DefaultTheme } from "./theme/colors";
import { queryClient } from "@/features/app/store";
import { Deeplink } from "@/features/app/deeplink";
import Loader from "@/components/Loader";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        linking={Deeplink.config}
        theme={DefaultTheme}
        fallback={<Loader />}
      >
        <KeyboardProvider>
          <AppNavigator />
        </KeyboardProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
