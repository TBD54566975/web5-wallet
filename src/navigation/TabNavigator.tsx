import React from "react";
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import ProfilesScreen from "@/features/profile/ProfilesScreen";
import CredentialsScreen from "@/features/credentials/CredentialsScreen";
import ConnectionsScreen from "@/features/connect/ConnectionsScreen";
import ActivityScreen from "@/features/activity/ActivityScreen";
import DiscoverScreen from "@/features/discover/DiscoverScreen";
import { Typography } from "@/theme/typography";
import { ColorTheme } from "@/theme/colors";
import { SPACE } from "@/theme/layouts";
import { type TabNavigatorInterface } from "@/types/navigation";

const Tab = createBottomTabNavigator<TabNavigatorInterface>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={discoverScreenOptions}
      />
      <Tab.Screen
        name="ProfilesScreen"
        component={ProfilesScreen}
        options={profilesScreenOptions}
      />
      <Tab.Screen
        name="CredentialsScreen"
        component={CredentialsScreen}
        options={credentialsScreenOptions}
      />
      <Tab.Screen
        name="ConnectionsScreen"
        component={ConnectionsScreen}
        options={connectionsScreenOptions}
      />
      <Tab.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={activityScreenOptions}
      />
    </Tab.Navigator>
  );
};

const tabOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    shadowColor: "transparent",
    marginVertical: SPACE.XSMALL,
    paddingTop: SPACE.XSMALL,
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

const discoverScreenOptions: BottomTabNavigationOptions = {
  title: "Discover",
  tabBarIcon: (props) => <Octicons name="broadcast" {...props} />,
};

const profilesScreenOptions: BottomTabNavigationOptions = {
  title: "Profiles",
  tabBarIcon: (props) => <Octicons name="people" {...props} />,
};

const credentialsScreenOptions: BottomTabNavigationOptions = {
  title: "Credentials",
  tabBarIcon: (props) => <Octicons name="id-badge" {...props} />,
};

const connectionsScreenOptions: BottomTabNavigationOptions = {
  title: "Connections",
  tabBarIcon: (props) => <Octicons name="webhook" {...props} />,
};

const activityScreenOptions: BottomTabNavigationOptions = {
  title: "Activity",
  tabBarIcon: (props) => <Octicons name="history" {...props} />,
};
