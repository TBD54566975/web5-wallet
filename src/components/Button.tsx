import React from "react";
import {
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { ObjectUtils } from "../utils/object";
import { Octicons } from "@expo/vector-icons";
import { ColorTheme } from "../theme/colors";
import { SPACE } from "../theme/layouts";
import { Typography } from "../theme/typography";

export const Button = (
  props: TouchableOpacityProps & {
    kind: "primary" | "secondary" | "destructive";
    style?: StyleProp<ViewStyle>;
    text: string;
    icon?: keyof typeof Octicons.glyphMap;
  }
) => {
  const { kind, style, text, icon, disabled, ...pressableProps } = props;

  return (
    <TouchableOpacity
      {...pressableProps}
      disabled={disabled}
      style={buttonStyle(style, disabled, kind)}
    >
      <>
        <Text style={textStyle(disabled, kind)}>{text}</Text>
        {!!icon && <Octicons name={icon} style={styles.icon} />}
      </>
    </TouchableOpacity>
  );
};

const getTextColor = (disabled?: boolean, kind?: string) => {
  if (disabled) {
    return ColorTheme.REDUCED;
  }

  switch (kind) {
    case "destructive":
      return ColorTheme.DEFAULT_CONTRAST;
    default:
      return ColorTheme.DEFAULT;
  }
};

const textStyle = (disabled?: boolean, kind?: string): StyleProp<TextStyle> => {
  return {
    ...Typography.body3,
    color: getTextColor(disabled, kind),
  };
};

const buttonStyle = (
  style: StyleProp<ViewStyle>,
  disabled?: boolean,
  kind?: string
): StyleProp<ViewStyle> => {
  return {
    backgroundColor: getButtonColor(disabled, kind),
    borderRadius: 999,
    padding: SPACE.SMALL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...ObjectUtils.safeSpread(style),
  };
};

const getButtonColor = (disabled?: boolean, kind?: string) => {
  if (disabled) {
    return ColorTheme.MUTED;
  }

  switch (kind) {
    case "primary":
      return ColorTheme.PRIMARY;
    case "secondary":
      return ColorTheme.GRAY_50;
    case "destructive":
      return ColorTheme.DANGER;
    default:
      return ColorTheme.PRIMARY;
  }
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: SPACE.LARGE,
  },
});
