import type { ManagedIdentity } from "@web5/agent";
import type Octicons from "@expo/vector-icons/Octicons";
import type { PermissionsRequestOptions } from "@tbd54566975/dwn-sdk-js";
import type { ProfileProtocol } from "../features/profile/protocol/profile-protocol";

// Most data models will change over time as real protocols and data gets used rather than mocks
export type MockCredential = {
  name: string;
  issuer: string;
  description: string;
  icon: keyof typeof Octicons.glyphMap;
};

export type MockConnection = {
  name: string;
  status: string;
  icon: keyof typeof Octicons.glyphMap;
  developer: string;
  description: string;
  id: string;
};

export type Profile = ManagedIdentity & Partial<ProfileProtocol>;

export type ConnectRequest = {
  did: string;
  origin: string;
  permissionRequests: ConnectRequestPermission[];
};

export type ConnectRequestPermission = Omit<
  PermissionsRequestOptions,
  "grantedBy" | "grantedFor" | "grantedTo" | "authorizationSigner"
>;
