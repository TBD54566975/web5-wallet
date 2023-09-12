import React, { useEffect, useState } from "react";
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
import CreatePassphraseScreen from "@/pages/onboarding/create/CreatePassphrase";
import CreateProfilesScreen from "@/pages/onboarding/create/CreateProfiles";
import CreatingWalletScreen from "@/pages/onboarding/create/CreatingWallet";
import AddProfileScreen from "@/pages/default/profiles/AddProfile";
import AddCredentialDetailScreen from "@/pages/default/credentials/AddCredentialDetail";
import AddCredentialOptionsScreen from "@/pages/default/credentials/AddCredentialOptions";
import type { AppNavigatorInterface } from "@/types/navigation";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import LoadingScreen from "@/pages/Loading";
import EnterPassphraseScreen from "@/pages/default/passphrase/EnterPassphrase";

const Stack = createNativeStackNavigator<AppNavigatorInterface>();

export const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof AppNavigatorInterface | undefined
  >(undefined);

  useEffect(() => {
    const computeInitialRoute = async () => {
      await IdentityAgentManager.initAgent();
      const isFirstLaunch = await IdentityAgentManager.isFirstLaunch();
      const initialRoute = isFirstLaunch
        ? "WelcomeScreen"
        : "EnterPassphraseScreen";
      setInitialRoute(initialRoute);
    };
    void computeInitialRoute();
  }, []);

  if (!initialRoute) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={appNavigatorOptions}
      initialRouteName={initialRoute}
    >
      {/* Onboarding */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="CreatePassphraseScreen"
        component={CreatePassphraseScreen}
      />
      <Stack.Screen
        name="CreateProfilesScreen"
        component={CreateProfilesScreen}
      />
      <Stack.Screen
        name="CreatingWalletScreen"
        component={CreatingWalletScreen}
      />

      {/* Login */}
      <Stack.Screen
        name="EnterPassphraseScreen"
        component={EnterPassphraseScreen}
      />

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
