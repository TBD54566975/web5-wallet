import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";

import { userProfiles } from "@/features/identity/ProfileManager";
import WelcomeScreen from "@/pages/onboarding/welcome/Welcome";
import ConnectionDetailScreen from "@/pages/default/connections/ConnectionDetail";
import ReviewConnectionScreen from "@/pages/default/connections/ReviewConnection";
import AddCredentialsScreen from "@/pages/default/credentials/AddCredentials";
import CredentialDetailScreen from "@/pages/default/credentials/CredentialDetail";

import ProfileDetailScreen from "@/pages/default/profiles/ProfileDetail";
import AuthScreen from "@/pages/onboarding/auth/Auth";
import CreateScreen from "@/pages/onboarding/create/Create";
import ImportScreen from "@/pages/onboarding/import/Import";

import { type LinkingOptions } from "@react-navigation/native";
import { DefaultTheme } from "@/theme/colors";

import AddProfileScreen from "@/pages/default/profiles/AddProfile";
import AddCredentialDetailScreen from "../pages/default/credentials/AddCredentialDetail";
import AddCredentialOptionsScreen from "../pages/default/credentials/AddCredentialOptions";

const Stack = createNativeStackNavigator();

const initialRoute = userProfiles.peek().length ? "Default" : "Onboarding";

const DeepLinkConfig: LinkingOptions<any> = {
  prefixes: ["web5://"],
  config: {
    screens: {
      PermissionRequestScreen: ":host/permission",
    },
  },
};

export const AppNavigator = () => {
  return (
    <NavigationContainer linking={DeepLinkConfig} theme={DefaultTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        {/* Onboarding */}
        <Stack.Screen name="Onboarding" component={WelcomeScreen} />
        <Stack.Screen name="Import" component={ImportScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />

        {/* Default */}
        <Stack.Screen name="Default" component={TabNavigator} />
        <Stack.Group screenOptions={DefaultGroupOptions}>
          <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
          <Stack.Screen
            name="CredentialDetail"
            component={CredentialDetailScreen}
          />
          <Stack.Screen name="AddProfile" component={AddProfileScreen} />
          <Stack.Screen
            name="AddCredentials"
            component={AddCredentialsScreen}
          />
          <Stack.Screen
            name="AddCredentialDetail"
            component={AddCredentialDetailScreen}
          />
          <Stack.Screen
            name="AddCredentialOptions"
            component={AddCredentialOptionsScreen}
          />
          <Stack.Screen
            name="ConnectionDetail"
            component={ConnectionDetailScreen}
          />
          <Stack.Screen
            name="ReviewConnection"
            component={ReviewConnectionScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DefaultGroupOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitle: () => false,
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  // headerBackImageSource: TODO: add arrow image source here
};
