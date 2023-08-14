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
import { TabBarIcon } from "./tab-bar-icon";

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
  tabBarIcon: TabBarIcon.ionicons("home-outline", "home"),
};

const ProfilesScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: TabBarIcon.ionicons("person-outline", "person"),
};

const CredentialsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: TabBarIcon.ionicons("card-outline", "card"),
};

const ConnectionsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: TabBarIcon.materialCommunity("graph-outline", "graph"),
};

const ActivityScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: TabBarIcon.materialCommunity(
    "clock-time-three-outline",
    "clock-time-three"
  ),
};
