import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { CredentialScreen } from "../features/credentials/CredentialScreen";
import { profilesAtom } from "../features/profile/atoms";
import { ProfilesScreen } from "../features/profile/ProfileScreen";
import { CreateProfileScreen } from "../features/profile/CreateProfileScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const getInitialRouteName = () =>
    profilesAtom.peek().length ? "ProfilesScreen" : "CreateProfileScreen";

  return (
    <Stack.Navigator initialRouteName={getInitialRouteName()}>
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={CreateProfileScreenOptions}
      />
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
    </Stack.Navigator>
  );
};

const CreateProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Create Profile",
  headerLargeTitle: true,
  animation: "slide_from_bottom",
};

const ProfilesScreenOptions: NativeStackNavigationOptions = {
  title: "Profiles",
  headerLargeTitle: true,
};

const CredentialScreenOptions: NativeStackNavigationOptions = {
  title: "Get Credentials",
  headerLargeTitle: true,
};
