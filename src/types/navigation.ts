import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { Octicons } from "@expo/vector-icons";
import type { MockCredential, Profile } from "./models";

export type AppNavigatorInterface = {
  WelcomeScreen: undefined;
  CreateProfilesScreen: undefined;
  CreatePassphraseScreen: { profileName: string; dwnEndpoint: string };
  CreateWalletScreen: {
    profileName: string;
    dwnEndpoint: string;
    passphrase: string;
  };
  EnterPassphraseScreen: undefined;
  Tabs: NavigatorScreenParams<TabNavigatorInterface>;
  ProfileDetailScreen: { profile: Profile };
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
  ConnectProfileSelectScreen: {
    request_uri: string;
    encryption_key: string;
  };
  ConnectQRScanScreen: undefined;
  ConnectPinConfirmScreen: { pin: string };
  WebviewCredentialsScreen: {
    url: string;
  };
  OIDCScreen: {
    client_id: string;
    client_metadata: string;
    nonce: string;
    response_mode: "direct_post";
    response_type: "id_token vp_token";
    response_uri: string;
    scope: "openid";
  };
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
