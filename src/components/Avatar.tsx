import React from "react";
import { type ImageURISource, StyleSheet, View, Image } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { ColorTheme } from "../theme/colors";

export type AvatarProps = {
  source?: ImageURISource;
  iconName?: keyof typeof Octicons.glyphMap;
  badgeName?: keyof typeof Octicons.glyphMap;
};
export const Avatar = (props: AvatarProps) => {
  const { source, iconName, badgeName } = props;

  return (
    <View style={styles.iconAvatarContainer}>
      {source ? (
        <Image source={source} style={styles.iconAvatarImage} />
      ) : (
        <Octicons
          name={iconName ?? "hash"}
          size={20}
          style={styles.iconAvatar}
        />
      )}
      {badgeName ? (
        <View style={styles.badgeAvatarContainer}>
          <Octicons name={badgeName} size={12} style={styles.badgeAvatar} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  iconAvatarContainer: {
    backgroundColor: ColorTheme.DEFAULT,
    borderRadius: 999,
    position: "relative",
    flexBasis: "auto",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAvatarImage: {
    width: 44,
    height: 44,
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
