import React from "react";
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../features/home/HomeScreen";
import { ProfilesScreen } from "../features/profile/ProfileScreen";
import { CredentialsScreen } from "../features/credentials/CredentialsScreen";
import { ConnectionsScreen } from "../features/connections/ConnectionsScreen";
import { ActivityScreen } from "../features/activity/ActivityScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={TabNavigatorOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <Tab.Screen
        name="Profiles"
        component={ProfilesScreen}
        options={ProfilesScreenOptions}
      />
      <Tab.Screen
        name="Credentials"
        component={CredentialsScreen}
        options={CredentialsScreenOptions}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={ConnectionsScreenOptions}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={ActivityScreenOptions}
      />
    </Tab.Navigator>
  );
};

const TabNavigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const HomeScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => {
    return (
      <Ionicons name={props.focused ? "home-outline" : "home"} {...props} />
    );
  },
};

const ProfilesScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => (
    <Ionicons name={props.focused ? "person-outline" : "person"} {...props} />
  ),
};

const CredentialsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => (
    <Ionicons name={props.focused ? "card-outline" : "card"} {...props} />
  ),
};

const ConnectionsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => (
    <MaterialCommunityIcons
      name={props.focused ? "graph-outline" : "graph"}
      {...props}
    />
  ),
};

const ActivityScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => (
    <MaterialCommunityIcons
      name={props.focused ? "clock-time-three-outline" : "clock-time-three"}
      {...props}
    />
  ),
};
