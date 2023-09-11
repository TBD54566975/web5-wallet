import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type Octicons from "@expo/vector-icons/Octicons";
import type { Credential, Profile } from "@/types/models";

export type AppNavigatorInterface = {
  WelcomeScreen: undefined;
  CreateScreen: undefined;
  Tabs: NavigatorScreenParams<TabNavigatorInterface>;
  ProfileDetailScreen: { profile: Profile };
  CredentialDetailScreen: {
    heading: string;
    subtitle: string;
    iconName: keyof typeof Octicons.glyphMap;
  };
  AddProfileScreen: undefined;
  AddCredentialsScreen: undefined;
  AddCredentialDetailScreen: { credential: Credential };
  AddCredentialOptionsScreen: { credential: Credential };
  ConnectionDetailScreen: {
    heading: string;
    iconName: keyof typeof Octicons.glyphMap;
  };
  ReviewConnectionScreen: undefined;
};

export type TabNavigatorInterface = {
  DiscoverScreen: undefined;
  ProfilesScreen: undefined;
  CredentialsScreen: undefined;
  ConnectionsScreen: undefined;
  ActivityScreen: undefined;
};

export type AppNavigatorProps<T extends keyof AppNavigatorInterface> =
  NativeStackScreenProps<AppNavigatorInterface, T>;

export type TabNavigatorProps<B extends keyof TabNavigatorInterface> =
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorInterface, B>,
    AppNavigatorProps<keyof AppNavigatorInterface>
  >;