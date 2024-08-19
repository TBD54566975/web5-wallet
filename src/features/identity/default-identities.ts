import type { Octicons } from "@expo/vector-icons";

type NewIdentityProps = {
  name: string;
  displayName: string;
  icon: keyof typeof Octicons.glyphMap;
};

export const defaultIdentities: NewIdentityProps[] = [
  {
    name: "Social",
    displayName: "Timothy Shamilov",
    icon: "hash",
  },
  {
    name: "Professional",
    displayName: "Timothy Shamilov",
    icon: "briefcase",
  },
];
