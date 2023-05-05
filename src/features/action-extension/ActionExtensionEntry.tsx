import React, { useEffect, useState } from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { ActionExtensionNavigator } from "../../navigation/ActionExtensionNavigator";
import { theme } from "../../App";

export const ActionExtensionEntry = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <PaperProvider theme={theme}>
        <ActionExtensionNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};
