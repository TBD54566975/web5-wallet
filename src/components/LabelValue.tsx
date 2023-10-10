import { ColorTheme } from "@/theme/colors";
import { Typography } from "@/theme/typography";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = { label: string; value: string };
export const LabelValueItem = ({ label, value }: Props) => {
  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <Text style={Typography.body1}>{value}</Text>
    </View>
  );
};

const labelStyle = StyleSheet.create([
  { color: ColorTheme.REDUCED },
  Typography.body4,
]);
