import React, { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { SPACE } from "../theme/layouts";

type Props = { style?: ViewStyle; checked: boolean };
export const Checkbox = ({ style, checked }: Props) => {
  const checkboxStyle = useMemo(
    () => ({ ...styles.checkbox, ...style }),
    [style]
  );

  return (
    <View style={checkboxStyle}>
      {!!checked && <Octicons name="check" size={16} />}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    padding: SPACE.XXSMALL,
    borderWidth: 2,
    borderRadius: 2,
    height: SPACE.LARGE,
    width: SPACE.LARGE,
    alignItems: "center",
    justifyContent: "center",
  },
});
