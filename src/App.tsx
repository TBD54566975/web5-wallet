import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppNavigator } from "./navigation/AppNavigator";
import { DefaultTheme } from "./theme/colors";
import { Deeplink } from "./features/app/deeplink";
import { queryClient } from "./features/app/queryclient";
import { Loader } from "./components/Loader";
import { credentialStoreActions } from "./features/credentials/atoms";
credentialStoreActions.initDemoVC();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <NavigationContainer
              linking={Deeplink.config}
              theme={DefaultTheme}
              fallback={<Loader />}
            >
              <AppNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
