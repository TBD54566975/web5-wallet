import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SsiStackNavigator } from "./SsiStackNavigator";
import { BrowserScreen } from "../features/browser/BrowserScreen";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={TabNavigatorOptions}>
      <Tab.Screen name="SSI" component={SsiStackNavigator} />
      <Tab.Screen name="Browser" component={BrowserScreen} />
    </Tab.Navigator>
  );
};

const TabNavigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
};
