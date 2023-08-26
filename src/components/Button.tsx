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
  const ButtonStyle = StyleSheet.compose(style, ButtonThemes[kind]);
  return (
    <Pressable {...pressableProps} style={[ButtonStyle, ButtonLayouts.default]}>
      <Text style={[Typography.body3, ButtonStyle]}>{children}</Text>
    </Pressable>
  );
};

export const ButtonLayouts = StyleSheet.create({
  default: {
    borderRadius: 999,
    padding: Space.SMALL,
    alignItems: "center",
    // marginVertical: Space.SMALL,
  },
});

export const ButtonThemes = StyleSheet.create({
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
