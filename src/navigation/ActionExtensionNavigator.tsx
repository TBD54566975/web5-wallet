import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { PresentationRequestScreen } from "../features/action-extension/PresentationRequestScreen";
import { LoadingScreen } from "../features/action-extension/LoadingScreen";
import { PresentationDefinition } from "verite";

export type ActionExtensionStackParamList = {
  LoadingScreen: undefined;
  PresentationRequestScreen: { pd: PresentationDefinition };
};

const Stack = createNativeStackNavigator<ActionExtensionStackParamList>();

export const ActionExtensionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={LoadingScreenOptions}
      />
      <Stack.Screen
        name="PresentationRequestScreen"
        component={PresentationRequestScreen}
        options={PresentationRequestScreenOptions}
      />
    </Stack.Navigator>
  );
};

const LoadingScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const PresentationRequestScreenOptions: NativeStackNavigationOptions = {
  title: "Presentation Request",
  headerLargeTitle: true,
  headerBackVisible: false,
};
