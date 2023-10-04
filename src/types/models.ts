import Octicons from "@expo/vector-icons/Octicons";

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
