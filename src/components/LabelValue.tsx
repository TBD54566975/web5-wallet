import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorTheme } from "../theme/colors";
import { Typography } from "../theme/typography";

type Props = { label: string; value: string };
export const LabelValueItem = ({ label, value }: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={Typography.body1}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  label: { ...Typography.body4, color: ColorTheme.REDUCED },
});
