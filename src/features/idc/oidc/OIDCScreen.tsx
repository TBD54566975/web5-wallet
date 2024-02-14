import React from "react";
import { StyleSheet, View, Text } from "react-native";
import type { AppNavigatorProps } from "../../../types/navigation";

type Props = AppNavigatorProps<"OIDCScreen">;
export const OIDCScreen = ({
  route: _route,
  navigation: _navigation,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text>SIOP goes here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
