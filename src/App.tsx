import React from "react";
import { Provider as PaperProvider, MD3DarkTheme } from "react-native-paper";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import PolyfillCrypto from "react-native-webview-crypto";
import { WasmExperiment } from "./features/wasm/WasmScreen";
import { enableLegendStateReact } from "@legendapp/state/react";

enableLegendStateReact();

export const theme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#ffec19",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <PaperProvider theme={theme}>
        <PolyfillCrypto />
        <AppNavigator />
        <WasmExperiment />
      </PaperProvider>
    </NavigationContainer>
  );
}
