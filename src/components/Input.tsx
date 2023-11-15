import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { Typography } from "../theme/typography";

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

const InputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
  },
});
