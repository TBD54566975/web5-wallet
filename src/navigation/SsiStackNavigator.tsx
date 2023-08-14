import React from "react";
import { IconButton } from "react-native-paper";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ProfilesScreen } from "../features/profile/ProfilesScreen";
import { CredentialScreen } from "../features/credentials/CredentialScreen";
import { CreateProfileScreen } from "../features/profile/CreateProfileScreen";
import { QRScannerScreen } from "../features/qr-scanner/QRScannerScreen";

const Stack = createNativeStackNavigator();

export const SsiStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilesScreen"
        component={ProfilesScreen}
        options={ProfilesScreenOptions}
      />
      <Stack.Screen
        name="CredentialScreen"
        component={CredentialScreen}
        options={CredentialScreenOptions}
      />
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={CreateProfileScreenOptions}
      />
      <Stack.Screen
        name="QRScannerScreen"
        component={QRScannerScreen}
        options={QRScannerScreenOptions}
      />
    </Stack.Navigator>
  );
};

const ProfilesScreenOptions = ({ navigation }) => {
  return {
    title: "Profiles",
    headerLargeTitle: true,
    headerRight: () => (
      <IconButton
        icon="qrcode-scan"
        onPress={() => navigation.navigate("QRScannerScreen")}
      />
    ),
  };
};

const CredentialScreenOptions: NativeStackNavigationOptions = {
  title: "Get Credentials",
  headerLargeTitle: true,
};

const CreateProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Create Profile",
  headerShown: true,
  headerLargeTitle: true,
};

const QRScannerScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "slide_from_bottom",
  presentation: "fullScreenModal",
};
