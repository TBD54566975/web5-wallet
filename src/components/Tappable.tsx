import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { type ItemProps, Item } from "./Item";
import { Checkbox } from "./Checkbox";

type Props = { onPress: () => void } & ItemProps;
export const Tappable = ({
  source,
  iconName,
  badgeName,
  heading,
  subtitle,
  onPress,
}: Props) => {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.textContainer}>
        <Item
          iconName={iconName}
          badgeName={badgeName}
          source={source}
          heading={heading}
          subtitle={subtitle}
        />
      </View>
      <View style={styles.iconContainer}>
        <Octicons name="chevron-right" size={24} />
      </View>
    </Pressable>
  );
};

type CheckableProps = { onPress: () => void; checked: boolean } & ItemProps;
export const Checkable = ({
  source,
  iconName,
  badgeName,
  heading,
  subtitle,
  onPress,
  checked = false,
}: CheckableProps) => {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.textContainer}>
        <Item
          iconName={iconName}
          badgeName={badgeName}
          source={source}
          heading={heading}
          subtitle={subtitle}
        />
      </View>
      <View style={styles.iconContainer}>
        <Checkbox checked={checked} size={16} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexBasis: "67%",
  },
  iconContainer: {
    flexBasis: "33%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
