/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { ColorTheme } from "@/theme/colors";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";

export const Button = (
  props: PressableProps & {
    kind: keyof typeof buttonStyles;
    style?: StyleProp<ViewStyle>;
    text: string;
    icon?: keyof typeof Octicons.glyphMap;
  }
) => {
  const { kind, style, text, icon, ...pressableProps } = props;
  const incomingStyle = StyleSheet.compose(buttonStyles[kind], style);

  return (
    <Pressable {...pressableProps} style={[styles.button, incomingStyle]}>
      <Text style={[Typography.body3, incomingStyle]}>{text}</Text>
      {!!icon && <Octicons name={icon} style={styles.icon} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    padding: SPACE.SMALL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: SPACE.LARGE,
  },
});

const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: ColorTheme.PRIMARY,
    color: ColorTheme.DEFAULT,
  },
  secondary: {
    color: ColorTheme.DEFAULT,
  },
  disabled: {
    backgroundColor: ColorTheme.MUTED,
    color: ColorTheme.REDUCED,
  },
  destructive: {
    backgroundColor: ColorTheme.DANGER,
    color: ColorTheme.DEFAULT_CONTRAST,
  },
});
