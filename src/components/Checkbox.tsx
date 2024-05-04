import React, { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { SPACE } from "../theme/layouts";

type Props = { style?: ViewStyle; checked: boolean; size?: number };
export const Checkbox = ({ style, checked, size = 24 }: Props) => {
  const checkboxStyle = useMemo(
    () => ({ ...styles.checkbox, ...style, height: size, width: size }),
    [size, style]
  );

  return (
    <View style={checkboxStyle}>
      {!!checked && <Octicons name="check" size={size * 0.67} />}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    padding: SPACE.XXSMALL,
    borderWidth: 1,
    borderRadius: 2,
    height: SPACE.LARGE,
    width: SPACE.LARGE,
    alignItems: "center",
    justifyContent: "center",
  },
});
