import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  type ImageURISource,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { Typography } from "@/theme/typography";
import { ColorTheme } from "@/theme/colors";

type ItemAvatarProps = {
  source?: ImageURISource;
  iconName?: keyof typeof Octicons.glyphMap;
  badgeName?: BadgeNames;
};
type ItemBodyProps = {
  heading: string;
  subtitle?: string;
  body?: string;
  headingSize?: keyof typeof Typography;
};

export type ItemProps = ItemAvatarProps & ItemBodyProps;
export const Item = (props: ItemProps) => {
  const { heading, subtitle, body, headingSize, badgeName, iconName, source } =
    props;

  return (
    <View style={ItemStyles.row}>
      <ItemAvatar badgeName={badgeName} iconName={iconName} source={source} />
      <ItemBody
        heading={heading}
        subtitle={subtitle}
        body={body}
        headingSize={headingSize}
      />
    </View>
  );
};

export type ItemStackProps = { images: ItemAvatarProps[] } & ItemBodyProps;
export const ItemStack = (props: ItemStackProps) => {
  const { images, heading, subtitle, body, headingSize } = props;

  return (
    <View>
      <View style={ItemStyles.row}>
        {images.map((imageProps, index) => (
          <ItemAvatar
            key={index}
            source={imageProps.source}
            iconName={imageProps.iconName}
            badgeName={imageProps.badgeName}
          />
        ))}
      </View>
      <ItemBody
        heading={heading}
        subtitle={subtitle}
        body={body}
        headingSize={headingSize}
      />
    </View>
  );
};

export const ItemAvatar = (props: ItemAvatarProps) => {
  const { source, iconName, badgeName } = props;

  return (
    <View style={ItemStyles.iconAvatarContainer}>
      {source ? (
        <Image source={source} style={ItemStyles.iconAvatarImage} />
      ) : (
        <Octicons
          name={iconName ?? "hash"}
          size={20}
          style={ItemStyles.iconAvatar}
        />
      )}
      {badgeName ? (
        <View style={ItemStyles.badgeAvatarContainer}>
          <Octicons name={badgeName} size={12} style={ItemStyles.badgeAvatar} />
        </View>
      ) : null}
    </View>
  );
};

export const ItemBody = (props: ItemBodyProps) => {
  const { heading, subtitle, body, headingSize } = props;
  return (
    <View>
      <Text style={Typography[headingSize ?? "body1"]}>{heading}</Text>
      {subtitle ? <Text style={Typography.body3}>{subtitle}</Text> : null}
      {body ? (
        <Text style={[Typography.body4, { color: ColorTheme.REDUCED }]}>
          {body}
        </Text>
      ) : null}
    </View>
  );
};

const ItemStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  iconAvatarContainer: {
    backgroundColor: ColorTheme.DEFAULT,
    borderRadius: 999,
    position: "relative",
    flexBasis: "auto",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAvatarImage: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  iconAvatar: {
    textAlign: "center",
    margin: "auto",
    color: ColorTheme.PRIMARY,
  },
  badgeAvatarContainer: {
    backgroundColor: ColorTheme.DEFAULT,
    borderRadius: 999,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderColor: ColorTheme.DEFAULT_CONTRAST,
    borderWidth: 1,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeAvatar: {
    textAlign: "center",
    margin: "auto",
    color: ColorTheme.DEFAULT_CONTRAST,
  },
});

export enum BadgeNames {
  PROFILE = "feed-person",
  CREDENTIAL = "id-badge",
  CONNECTION = "webhook",
}
