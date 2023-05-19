import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ProfileScreen } from "../features/profile/ProfileScreen";
import { CredentialScreen } from "../features/credentials/CredentialScreen";
import { profilesAtom } from "../features/profile/atoms";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const getInitialRouteName = () =>
    profilesAtom.peek().length ? "CredentialScreen" : "ProfileScreen";

  return (
    <Stack.Navigator initialRouteName={getInitialRouteName()}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={ProfileScreenOptions}
      />
      <Stack.Screen
        name="CredentialScreen"
        component={CredentialScreen}
        options={CredentialScreenOptions}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Create Profile",
  headerLargeTitle: true,
};
const CredentialScreenOptions: NativeStackNavigationOptions = {
  title: "Get Credentials",
  headerLargeTitle: true,
  headerBackVisible: false,
};
