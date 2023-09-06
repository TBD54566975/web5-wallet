import { Typography } from "@/theme/typography";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

export const Input = (
  props: { label: string; nativeID: string } & TextInputProps
) => {
  const { label, nativeID, ...inputProps } = props;
  return (
    <View>
      <Text nativeID={nativeID} style={Typography.body1}>
        {label}
      </Text>
      <TextInput
        aria-label="input"
        aria-labelledby={nativeID}
        style={InputStyles.input}
        {...inputProps}
      />
    </View>
  );
};

export const InputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
  },
});
