import Octicons from "@expo/vector-icons/Octicons";
import type { DidState } from "@tbd54566975/dids";

// Most data models will change over time as real protocols and data gets used rather than mocks
export type Profile = {
  did: DidState;
  id: string;
  name: string;
  dateCreated: Date;
  icon: keyof typeof Octicons.glyphMap;
  connections: Connection[];
  credentials: Credential[];
  displayName: string;
};

export type Credential = {
  name: string;
  issuer: string;
  description: string;
  icon: keyof typeof Octicons.glyphMap;
};

export type Connection = {
  name: string;
  icon: keyof typeof Octicons.glyphMap;
  developer: string;
  description: string;
  id: string;
};
