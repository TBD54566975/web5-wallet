import React from "react";
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import ProfilesScreen from "@/pages/default/profiles/Profiles";
import CredentialsScreen from "@/pages/default/credentials/Credentials";
import ConnectionsScreen from "@/pages/default/connections/Connections";
import ActivityScreen from "@/pages/default/activity/Activity";
import DiscoverScreen from "@/pages/default/discover/Discover";
import { Space } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { ColorTheme } from "@/theme/colors";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={TabOptions}>
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={DiscoverScreenOptions}
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

const TabOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    shadowColor: "transparent",
    marginVertical: Space.XSMALL,
    paddingTop: Space.XSMALL,
  },
  tabBarActiveTintColor: ColorTheme.DEFAULT,
  tabBarInactiveTintColor: ColorTheme.MUTED,
  headerStyle: {
    height: 120,
    backgroundColor: ColorTheme.PRIMARY,
  },
  headerTitleContainerStyle: {
    justifyContent: "flex-end",
  },
  headerTitleStyle: {
    ...Typography.heading1,
  },
  headerTitleAllowFontScaling: true,
  headerTitleAlign: "left",
};

const DiscoverScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => <Octicons name="broadcast" {...props} />,
};

const ProfilesScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => <Octicons name="people" {...props} />,
};

const CredentialsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => <Octicons name="id-badge" {...props} />,
};

const ConnectionsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => <Octicons name="webhook" {...props} />,
};

const ActivityScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: (props) => <Octicons name="history" {...props} />,
};
