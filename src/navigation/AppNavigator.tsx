import React, { useEffect, useState } from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import type { AppNavigatorInterface } from "../types/navigation";
import { IdentityAgentManager } from "../features/identity/IdentityAgentManager";
import { Loader } from "../components/Loader";
import { CreatePassphraseScreen } from "../features/auth/CreatePassphraseScreen";
import { EnterPassphraseScreen } from "../features/auth/EnterPassphraseScreen";
import { WelcomeScreen } from "../features/auth/WelcomeScreen";
import { ConnectPinConfirmScreen } from "../features/connect/ConnectPinConfirmScreen";
import { ConnectProfileSelectScreen } from "../features/connect/ConnectProfileSelectScreen";
import { ConnectQRScanScreen } from "../features/connect/ConnectQRScanScreen";
import { ConnectionDetailScreen } from "../features/connect/ConnectionDetailScreen";
import { ReviewConnectionScreen } from "../features/connect/ReviewConnectionScreen";
import { AddCredentialDetailScreen } from "../features/credentials/AddCredentialDetailScreen";
import { AddCredentialOptionsScreen } from "../features/credentials/AddCredentialOptionsScreen";
import { AddCredentialsScreen } from "../features/credentials/AddCredentialsScreen";
import { CredentialDetailScreen } from "../features/credentials/CredentialDetailScreen";
import { CreateWalletScreen } from "../features/auth/CreateWalletScreen";
import { AddProfileScreen } from "../features/profile/AddProfileScreen";
import { CreateProfilesScreen } from "../features/profile/CreateProfilesScreen";
import { ProfileDetailScreen } from "../features/profile/ProfileDetailScreen";
import { WebviewCredentialsScreen } from "../features/idc/webview-idc/WebviewCredentialsScreen";
import { OIDCScreen } from "../features/idc/oidc/OIDCScreen";

const Stack = createNativeStackNavigator<AppNavigatorInterface>();

export const AppNavigator = () => {
  const [initialRoute, setInitialRoute] =
    useState<keyof AppNavigatorInterface>();

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
    <Stack.Navigator screenOptions={defaults} initialRouteName={initialRoute}>
      {/* Onboarding */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="CreateProfilesScreen"
        component={CreateProfilesScreen}
        options={createProfilesScreenOptions}
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
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={fadeFromBottom}
      />
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
          options={connectProfileSelectScreenOptions}
        />
        <Stack.Screen
          name="ConnectPinConfirmScreen"
          component={ConnectPinConfirmScreen}
        />
        <Stack.Screen
          name="WebviewCredentialsScreen"
          component={WebviewCredentialsScreen}
          options={slideFromBottom}
        />
        <Stack.Screen
          name="OIDCScreen"
          component={OIDCScreen}
          options={slideFromBottom}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const createProfilesScreenOptions: NativeStackNavigationOptions = {
  title: "Create profile",
  headerShown: true,
  headerLargeTitle: true,
};

const fadeFromBottom: NativeStackNavigationOptions = {
  animation: "fade_from_bottom",
};

const slideFromBottom: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
};

const defaults: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "slide_from_right",
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
  headerTransparent: true,
  headerTitle: "",
  headerTintColor: "white",
};

const connectProfileSelectScreenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
  headerBackVisible: false,
};
