import { type LinkingOptions } from "@react-navigation/native";

export const linking: LinkingOptions<any> = {
  prefixes: ["web5://"],
  config: {
    screens: {
      PermissionRequestScreen: ":host/permission",
    },
  },
};
