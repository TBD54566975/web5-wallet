import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppNavigator } from "./navigation/AppNavigator";
import { DefaultTheme } from "./theme/colors";
import { Deeplink } from "./features/app/deeplink";
import { queryClient } from "./features/app/store";
import { Loader } from "./components/Loader";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer
          linking={Deeplink.config}
          theme={DefaultTheme}
          fallback={<Loader />}
        >
          <KeyboardProvider>
            <AppNavigator />
          </KeyboardProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
