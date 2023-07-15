import React from "react";
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SsiStackNavigator } from "./SsiStackNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ color, size }) => (
  <Ionicons name="card-outline" color={color} size={size} />
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={TabNavigatorOptions}>
      <Tab.Screen
        name="SSI"
        component={SsiStackNavigator}
        options={SSIScreenOptions}
      />
    </Tab.Navigator>
  );
};

const TabNavigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const SSIScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: TabBarIcon,
};
