import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ProfileScreen } from "../features/profile/ProfileScreen";
import { CredentialScreen } from "../features/credentials/CredentialScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
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
