import React, { useEffect } from "react";
import { Provider as PaperProvider, MD3DarkTheme } from "react-native-paper";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { DwnService } from "./features/dwn/dwn-service";
import { enableLegendStateReact } from "@legendapp/state/react";
import { StatusBar } from "expo-status-bar";

enableLegendStateReact();

export const theme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#ffec19",
  },
};

export default function App() {
  useEffect(() => {
    DwnService.initMemoryDwn();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}
