import React from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ProfilesScreen } from "../features/profile/ProfileScreen";
import { CredentialScreen } from "../features/credentials/CredentialScreen";
import { CreateProfileScreen } from "../features/profile/CreateProfileScreen";

const Stack = createNativeStackNavigator();

export const SsiStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilesScreen"
        component={ProfilesScreen}
        options={ProfilesScreenOptions}
      />
      <Stack.Screen
        name="CredentialScreen"
        component={CredentialScreen}
        options={CredentialScreenOptions}
      />
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={CreateProfileScreenOptions}
      />
    </Stack.Navigator>
  );
};

const ProfilesScreenOptions: NativeStackNavigationOptions = {
  title: "Profiles",
  headerLargeTitle: true,
};

const CredentialScreenOptions: NativeStackNavigationOptions = {
  title: "Get Credentials",
  headerLargeTitle: true,
};

const CreateProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Create Profile",
  headerShown: true,
  headerLargeTitle: true,
};
