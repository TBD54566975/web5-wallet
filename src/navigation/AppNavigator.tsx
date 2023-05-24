import React from "react";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { profilesAtom } from "../features/profile/atoms";
import { CreateProfileScreen } from "../features/profile/CreateProfileScreen";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const getInitialRouteName = () =>
    profilesAtom.peek().length ? "Home" : "CreateProfileScreen";

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={StackNavigatorOptions}
    >
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={CreateProfileScreenOptions}
      />

      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
};

const StackNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const CreateProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Create Profile",
  headerShown: true,
  headerLargeTitle: true,
  animation: "slide_from_bottom",
};
