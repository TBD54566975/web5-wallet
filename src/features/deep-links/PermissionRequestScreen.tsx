import React from "react";
import { Text } from "react-native-paper";

type Params = {
  app: string;
  "x-source": string;
  "x-success": string;
  "x-error": string;
  req: string;
};

export const PermissionRequestScreen = ({ route }) => {
  const params: Params = route.params;
  console.log("app: " + params.app);
  console.log("x-source: " + params["x-source"]);
  console.log("x-success: " + params["x-success"]);
  console.log("x-error: " + params["x-error"]);
  console.log("req: " + params.req);

  return <Text>Hello, PermissionRequestScreen!</Text>;
};
