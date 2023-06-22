import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { profilesAtom } from "../features/profile/atoms";
import { WelcomeScreen } from "../features/onboarding/WelcomeScreen";
import { TabNavigator } from "./TabNavigator";

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
