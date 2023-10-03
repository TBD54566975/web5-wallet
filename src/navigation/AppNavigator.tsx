import React, { useEffect, useState } from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import WelcomeScreen from "@/screens/onboarding/welcome/Welcome";
import ConnectionDetailScreen from "@/screens/default/connections/ConnectionDetailScreen";
import ReviewConnectionScreen from "@/screens/default/connections/ReviewConnectionScreen";
import AddCredentialsScreen from "@/screens/default/credentials/AddCredentialsScreen";
import CredentialDetailScreen from "@/screens/default/credentials/CredentialDetailScreen";
import ProfileDetailScreen from "@/screens/default/profiles/ProfileDetailScreen";
import CreatePassphraseScreen from "@/screens/onboarding/create/CreatePassphraseScreen";
import CreateProfilesScreen from "@/screens/onboarding/create/CreateProfilesScreen";
import CreateWalletScreen from "@/screens/onboarding/create/CreateWalletScreen";
import AddProfileScreen from "@/screens/default/profiles/AddProfileScreen";
import AddCredentialDetailScreen from "@/screens/default/credentials/AddCredentialDetailScreen";
import AddCredentialOptionsScreen from "@/screens/default/credentials/AddCredentialOptionsScreen";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import LoadingScreen from "@/components/Loading";
import EnterPassphraseScreen from "@/screens/default/passphrase/EnterPassphraseScreen";
import ConnectionRequestScreen from "@/screens/default/connections/ConnectionRequestScreen";
import AddConnectionScreen from "@/screens/default/connections/AddConnectionScreen";
import type { AppNavigatorInterface } from "@/types/navigation";

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
        name="CreateProfilesScreen"
        component={CreateProfilesScreen}
      />
      <Stack.Screen
        name="CreatePassphraseScreen"
        component={CreatePassphraseScreen}
      />
      <Stack.Screen name="CreateWalletScreen" component={CreateWalletScreen} />

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
        <Stack.Screen
          name="AddConnectionScreen"
          component={AddConnectionScreen}
          options={addConnectionScreenOptions}
        />
      </Stack.Group>

      {/* Full Screen Modals */}
      <Stack.Group screenOptions={fullscreenModalGroupOptions}>
        <Stack.Screen
          name="ConnectionRequestScreen"
          component={ConnectionRequestScreen}
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

const fullscreenModalGroupOptions: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
  presentation: "fullScreenModal",
};

const addConnectionScreenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
};
