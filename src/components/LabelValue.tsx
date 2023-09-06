import { ColorTheme } from "@/theme/colors";
import { Typography } from "@/theme/typography";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LabelValueItem = (props: { label; value }) => {
  return (
    <View style={LabelValueStyles.layout}>
      <Text style={LabelValueStyles.label}>{props.label}</Text>
      <Text style={Typography.body1}>{props.value}</Text>
    </View>
  );
};

const LabelValueStyles = StyleSheet.create({
  layout: {
    marginBottom: 20,
  },
  label: {
    color: ColorTheme.REDUCED,
    ...Typography.body4,
  },
});
