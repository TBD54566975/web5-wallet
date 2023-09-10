import { ColorTheme } from "@/theme/colors";
import { Typography } from "@/theme/typography";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = { label: string; value: string };
export const LabelValueItem = ({ label, value }: Props) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.label}>{label}</Text>
      <Text style={Typography.body1}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginBottom: 20,
  },
  label: {
    color: ColorTheme.REDUCED,
    ...Typography.body4,
  },
});
