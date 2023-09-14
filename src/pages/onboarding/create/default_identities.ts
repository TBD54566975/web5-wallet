import Octicons from "@expo/vector-icons/Octicons";

type NewIdentityProps = {
  name: string;
  displayName: string;
  icon: keyof typeof Octicons.glyphMap;
};

export const defaultIdentities: NewIdentityProps[] = [
  {
    name: "Social",
    displayName: "Alex Aardvark",
    icon: "hash",
  },
  {
    name: "Professional",
    displayName: "Alex Aardvark",
    icon: "briefcase",
  },
];
