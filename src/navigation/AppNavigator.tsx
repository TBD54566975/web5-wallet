import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import WelcomeScreen from "@/pages/onboarding/welcome/Welcome";
import ConnectionDetailScreen from "@/pages/default/connections/ConnectionDetail";
import ReviewConnectionScreen from "@/pages/default/connections/ReviewConnection";
import AddCredentialsScreen from "@/pages/default/credentials/AddCredentials";
import CredentialDetailScreen from "@/pages/default/credentials/CredentialDetail";
import ProfileDetailScreen from "@/pages/default/profiles/ProfileDetail";
import CreateScreen from "@/pages/onboarding/create/Create";
import AddProfileScreen from "@/pages/default/profiles/AddProfile";
import AddCredentialDetailScreen from "@/pages/default/credentials/AddCredentialDetail";
import AddCredentialOptionsScreen from "@/pages/default/credentials/AddCredentialOptions";
import { profilesAtom } from "@/features/identity/atoms";
import type { AppNavigatorInterface } from "@/types/navigation";

const Stack = createNativeStackNavigator<AppNavigatorInterface>();
const initialRoute = profilesAtom.peek().length ? "Tabs" : "WelcomeScreen";

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={appNavigatorOptions}
      initialRouteName={initialRoute}
    >
      {/* Onboarding */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />

      {/* Tabs */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Group screenOptions={authedGroupOptions}>
        <Stack.Screen
          name="ProfileDetailScreen"
          component={ProfileDetailScreen}
        />
        <Stack.Screen
          name="CredentialDetailScreen"
          component={CredentialDetailScreen}
        />
        <Stack.Screen name="AddProfileScreen" component={AddProfileScreen} />
        <Stack.Screen
          name="AddCredentialsScreen"
          component={AddCredentialsScreen}
        />
        <Stack.Screen
          name="AddCredentialDetailScreen"
          component={AddCredentialDetailScreen}
        />
        <Stack.Screen
          name="AddCredentialOptionsScreen"
          component={AddCredentialOptionsScreen}
        />
        <Stack.Screen
          name="ConnectionDetailScreen"
          component={ConnectionDetailScreen}
        />
        <Stack.Screen
          name="ReviewConnectionScreen"
          component={ReviewConnectionScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const appNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
};
const authedGroupOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitle: () => false,
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  // headerBackImageSource: TODO: add arrow image source here
};
