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
import Octicons from "@expo/vector-icons/Octicons";
import { ColorTheme } from "../theme/colors";
import { SPACE } from "../theme/layouts";
import { Typography } from "../theme/typography";

export const Button = (
  props: TouchableOpacityProps & {
    kind: "primary" | "secondary" | "disabled" | "destructive";
    style?: StyleProp<ViewStyle>;
    text: string;
    icon?: keyof typeof Octicons.glyphMap;
  }
) => {
  const { kind, style, text, icon, ...pressableProps } = props;

  const getButtonColor = () => {
    switch (kind) {
      case "primary":
        return ColorTheme.PRIMARY;
      case "secondary":
        return ColorTheme.GRAY_50;
      case "disabled":
        return ColorTheme.MUTED;
      case "destructive":
        return ColorTheme.DANGER;
      default:
        return ColorTheme.PRIMARY;
    }
  };

  const getTextColor = () => {
    switch (kind) {
      case "disabled":
        return ColorTheme.REDUCED;
      case "destructive":
        return ColorTheme.DEFAULT_CONTRAST;
      default:
        return ColorTheme.DEFAULT;
    }
  };

  const buttonStyle = (): StyleProp<ViewStyle> => {
    return {
      backgroundColor: getButtonColor(),
      borderRadius: 999,
      padding: SPACE.SMALL,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      ...ObjectUtils.safeSpread(style),
    };
  };

  const textStyle = (): StyleProp<TextStyle> => {
    return {
      ...Typography.body3,
      color: getTextColor(),
    };
  };

  return (
    <TouchableOpacity {...pressableProps} style={buttonStyle()}>
      <>
        <Text style={textStyle()}>{text}</Text>
        {!!icon && <Octicons name={icon} style={styles.icon} />}
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: SPACE.LARGE,
  },
});
