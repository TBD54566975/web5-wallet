import React, { useEffect, useState } from "react";
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
import { Typography } from "@/theme/typography";
import { ColorTheme } from "@/theme/colors";
import { SPACE } from "@/theme/layouts";
import { type TabNavigatorInterface } from "@/types/navigation";
import { type AppStateStatus } from "react-native/types";
import { AppState } from "react-native";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";

const Tab = createBottomTabNavigator<TabNavigatorInterface>();

export const TabNavigator = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
        console.log("isStarted:", IdentityAgentManager.isStarted);
        // Place your code here that you want to run when the component is displayed in the foreground
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

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
