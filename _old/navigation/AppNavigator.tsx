import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { profilesAtom } from "../features/profile/atoms";
import { WelcomeScreen } from "../features/onboarding/WelcomeScreen";
import { TabNavigator } from "./TabNavigator";
import { PermissionRequestScreen } from "../features/permissions/PermissionRequestScreen";
import { CreateProfileScreen } from "../features/profile/CreateProfileScreen";
import { CredentialScreen } from "../features/credentials/CredentialScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const getInitialRouteName = () =>
    profilesAtom.peek().length ? "Tabs" : "WelcomeScreen";

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
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={({ route }) => {
          return { headerTitle: getFocusedRouteNameFromRoute(route) ?? "Home" };
        }}
      />
      <Stack.Screen
        name="PermissionRequestScreen"
        component={PermissionRequestScreen}
        options={PermissionRequestScreenOptions}
      />
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={CreateProfileScreenOptions}
      />
      <Stack.Screen
        name="CredentialScreen"
        component={CredentialScreen}
        options={CredentialScreenOptions}
      />
    </Stack.Navigator>
  );
};

const StackNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerLargeTitle: true,
};

const WelcomeScreenOptions: NativeStackNavigationOptions = {
  title: "Welcome",
  animation: "slide_from_bottom",
};

const PermissionRequestScreenOptions: NativeStackNavigationOptions = {
  title: "Permission Request",
  animation: "slide_from_bottom",
  presentation: "fullScreenModal",
};

const CreateProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Create Profile",
};

const CredentialScreenOptions: NativeStackNavigationOptions = {
  title: "Get Credentials",
};
