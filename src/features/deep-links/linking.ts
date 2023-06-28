import { LinkingOptions } from "@react-navigation/native";

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ["web5://"],
  config: {
    screens: {
      PermissionRequestScreen: ":app/permission",
    },
  },
};
