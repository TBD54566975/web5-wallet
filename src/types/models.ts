import type { ManagedIdentity } from "@web5/agent";
import type { ProfileProtocol } from "@/features/profile/protocol/profile-protocol";
import type Octicons from "@expo/vector-icons/Octicons";

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

export type ConnectionRequestRaw = {
  did: string;
  origin: string;
  // encrypted stringified Uint8Array
  permissionRequests: string | string[];
};

export type ConnectionRequestU8A = {
  did: string;
  origin: string;
  // encrypted Uint8Array
  permissionRequests: Uint8Array | Uint8Array[];
};
