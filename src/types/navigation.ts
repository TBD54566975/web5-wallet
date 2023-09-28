import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type Octicons from "@expo/vector-icons/Octicons";
import type { MockCredential } from "@/types/models";
import type { ManagedIdentity } from "@web5/agent";

export type AppNavigatorInterface = {
  WelcomeScreen: undefined;
  CreatePassphraseScreen: undefined;
  CreateProfilesScreen: undefined;
  CreateWalletScreen: { passphrase: string };
  EnterPassphraseScreen: undefined;
  Tabs: NavigatorScreenParams<TabNavigatorInterface>;
  ProfileDetailScreen: { identity: ManagedIdentity };
  CredentialDetailScreen: {
    heading: string;
    subtitle: string;
    iconName: keyof typeof Octicons.glyphMap;
  };
  AddProfileScreen: undefined;
  AddCredentialsScreen: undefined;
  AddCredentialDetailScreen: { credential: MockCredential };
  AddCredentialOptionsScreen: { credential: MockCredential };
  ConnectionDetailScreen: {
    heading: string;
    iconName: keyof typeof Octicons.glyphMap;
  };
  ReviewConnectionScreen: undefined;
  ConnectionRequestScreen: undefined;
  AddConnectionScreen: undefined;
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
