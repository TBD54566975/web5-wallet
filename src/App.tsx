import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { userProfiles } from "@/services/profile.service";
import Octicons from "@expo/vector-icons/Octicons";
import WelcomeScreen from "@/pages/onboarding/welcome/Welcome";
import ConnectionDetailScreen from "@/pages/default/connections/ConnectionDetail";
import ReviewConnectionScreen from "@/pages/default/connections/ReviewConnection";
import AddCredentialsScreen from "@/pages/default/credentials/AddCredentials";
import CredentialDetailScreen from "@/pages/default/credentials/CredentialDetail";
import DiscoverScreen from "@/pages/default/discover/Discover";
import ProfileDetailScreen from "@/pages/default/profiles/ProfileDetail";
import AuthScreen from "@/pages/onboarding/auth/Auth";
import CreateScreen from "@/pages/onboarding/create/Create";
import ImportScreen from "@/pages/onboarding/import/Import";
import ProfilesScreen from "@/pages/default/profiles/Profiles";
import CredentialsScreen from "@/pages/default/credentials/Credentials";
import ConnectionsScreen from "@/pages/default/connections/Connections";
import ActivityScreen from "@/pages/default/activity/Activity";
import { type LinkingOptions } from "@react-navigation/native";
import { ColorTheme, DefaultTheme } from "@/theme/colors";
import { Space } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import AddProfileScreen from "@/pages/default/profiles/AddProfile";
import AddCredentialDetailScreen from "./pages/default/credentials/AddCredentialDetail";
import AddCredentialOptionsScreen from "./pages/default/credentials/AddCredentialOptions";

const App = () => {
  const Stack = createNativeStackNavigator();
  const initialRoute = userProfiles.peek().length ? "Default" : "Onboarding";

  return (
    <NavigationContainer linking={DeepLinkConfig} theme={DefaultTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        {/* Onboarding */}
        <Stack.Screen name="Onboarding" component={WelcomeScreen} />
        <Stack.Screen name="Import" component={ImportScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />

        {/* Default */}
        <Stack.Screen name="Default" component={TabNavigation} />
        <Stack.Group
          screenOptions={{
            headerShown: true,
            headerTitle: () => false,
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            // headerBackImageSource: TODO: add arrow image source here
          }}
        >
          <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
          <Stack.Screen
            name="CredentialDetail"
            component={CredentialDetailScreen}
          />
          <Stack.Screen name="AddProfile" component={AddProfileScreen} />
          <Stack.Screen
            name="AddCredentials"
            component={AddCredentialsScreen}
          />
          <Stack.Screen
            name="AddCredentialDetail"
            component={AddCredentialDetailScreen}
          />
          <Stack.Screen
            name="AddCredentialOptions"
            component={AddCredentialOptionsScreen}
          />
          <Stack.Screen
            name="ConnectionDetail"
            component={ConnectionDetailScreen}
          />
          <Stack.Screen
            name="ReviewConnection"
            component={ReviewConnectionScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
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

export const DeepLinkConfig: LinkingOptions<any> = {
  prefixes: ["web5://"],
  config: {
    screens: {
      PermissionRequestScreen: ":host/permission",
    },
  },
};
