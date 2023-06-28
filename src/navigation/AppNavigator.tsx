import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { profilesAtom } from "../features/profile/atoms";
import { WelcomeScreen } from "../features/onboarding/WelcomeScreen";
import { TabNavigator } from "./TabNavigator";
import { PermissionRequestScreen } from "../features/deep-links/PermissionRequestScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const getInitialRouteName = () =>
    profilesAtom.peek().length ? "Home" : "CreateProfileScreen";

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={StackNavigatorOptions}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={WelcomeScreenOptions}
      />

      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen
        name="PermissionRequestScreen"
        component={PermissionRequestScreen}
        options={PermissionRequestScreenOptions}
      />
    </Stack.Navigator>
  );
};

const StackNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const WelcomeScreenOptions: NativeStackNavigationOptions = {
  title: "Welcome",
  headerShown: true,
  headerLargeTitle: true,
  animation: "slide_from_bottom",
};

const PermissionRequestScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "slide_from_bottom",
};
