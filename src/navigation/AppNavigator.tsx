import React, { useEffect, useState } from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import WelcomeScreen from "@/features/auth/WelcomeScreen";
import ConnectionDetailScreen from "@/features/connect/ConnectionDetailScreen";
import ReviewConnectionScreen from "@/features/connect/ReviewConnectionScreen";
import AddCredentialsScreen from "@/features/credentials/AddCredentialsScreen";
import CredentialDetailScreen from "@/features/credentials/CredentialDetailScreen";
import ProfileDetailScreen from "@/features/profile/ProfileDetailScreen";
import CreatePassphraseScreen from "@/features/auth/CreatePassphraseScreen";
import CreateProfilesScreen from "@/features/profile/CreateProfilesScreen";
import CreateWalletScreen from "@/features/identity/CreateWalletScreen";
import AddProfileScreen from "@/features/profile/AddProfileScreen";
import AddCredentialDetailScreen from "@/features/credentials/AddCredentialDetailScreen";
import AddCredentialOptionsScreen from "@/features/credentials/AddCredentialOptionsScreen";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import Loader from "@/components/Loader";
import EnterPassphraseScreen from "@/features/auth/EnterPassphraseScreen";
import ConnectProfileSelectScreen from "@/features/connect/ConnectProfileSelectScreen";
import ConnectQRScanScreen from "@/features/connect/ConnectQRScanScreen";
import type { AppNavigatorInterface } from "@/types/navigation";
import ConnectPinConfirmScreen from "@/features/connect/ConnectPinConfirmScreen";

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
    return <Loader />;
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
          name="ConnectQRScanScreen"
          component={ConnectQRScanScreen}
          options={connectQRScanScreenOptions}
        />
        <Stack.Screen
          name="ConnectProfileSelectScreen"
          component={ConnectProfileSelectScreen}
        />
        <Stack.Screen
          name="ConnectPinConfirmScreen"
          component={ConnectPinConfirmScreen}
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

const connectQRScanScreenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
};
