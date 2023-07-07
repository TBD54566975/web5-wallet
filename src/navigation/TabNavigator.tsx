import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SsiStackNavigator } from "./SsiStackNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={TabNavigatorOptions}>
      <Tab.Screen
        name="SSI"
        component={SsiStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabNavigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
};
