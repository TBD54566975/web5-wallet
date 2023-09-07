/* eslint-disable react-native/no-unused-styles */
import { ColorTheme } from "@/theme/colors";
import { Space } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React from "react";
import { StyleSheet, Pressable, Text, PressableProps } from "react-native";

export const Button = (
  props: PressableProps & {
    kind: Exclude<keyof typeof ButtonThemes, "default">;
    style?;
    children;
  }
) => {
  const { kind, children, style, ...pressableProps } = props;
  const ButtonStyle = StyleSheet.compose(ButtonThemes[kind], style);
  return (
    <Pressable {...pressableProps} style={[ButtonLayouts.default, ButtonStyle]}>
      <Text style={[Typography.body3, ButtonStyle]}>{children}</Text>
    </Pressable>
  );
};

const ButtonLayouts = StyleSheet.create({
  default: {
    borderRadius: 999,
    padding: Space.SMALL,
    alignItems: "center",
  },
});

const ButtonThemes = StyleSheet.create({
  primary: {
    backgroundColor: ColorTheme.PRIMARY,
    color: ColorTheme.DEFAULT,
  },
  secondary: {
    color: ColorTheme.DEFAULT,
  },
  destructive: {
    backgroundColor: ColorTheme.DANGER,
    color: ColorTheme.DEFAULT_CONTRAST,
  },
});
