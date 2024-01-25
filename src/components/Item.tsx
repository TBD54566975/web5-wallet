import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../theme/typography";
import { Avatar, type AvatarProps } from "./Avatar";
import { ColorTheme } from "../theme/colors";

export type ItemBodyProps = {
  heading: string;
  subtitle?: string;
  body?: string;
  headingSize?: keyof typeof Typography;
};
export type ItemProps = AvatarProps & ItemBodyProps;
export const Item = (props: ItemProps) => {
  const { heading, subtitle, body, headingSize, badgeName, iconName, source } =
    props;

  return (
    <View style={styles.row}>
      <Avatar badgeName={badgeName} iconName={iconName} source={source} />
      <ItemBody
        heading={heading}
        subtitle={subtitle}
        body={body}
        headingSize={headingSize}
      />
    </View>
  );
};

export const ItemBody = (props: ItemBodyProps) => {
  const { heading, subtitle, body, headingSize } = props;
  return (
    <View>
      <Text style={Typography[headingSize ?? "body1"]}>{heading}</Text>
      {subtitle ? <Text style={Typography.body3}>{subtitle}</Text> : null}
      {body ? <Text style={styles.bodyText}>{body}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  bodyText: {
    ...Typography.body4,
    color: ColorTheme.REDUCED,
  },
});
