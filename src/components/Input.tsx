import React from "react";
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
  StyleSheet,
} from "react-native";
import { Typography } from "../theme/typography";

export const Input = (props: { label: string } & TextInputProps) => {
  const { label, ...inputProps } = props;
  return (
    <View>
      <Text style={Typography.body1}>{label}</Text>
      <TextInput style={InputStyles.input} {...inputProps} />
    </View>
  );
};

const InputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
  },
});
