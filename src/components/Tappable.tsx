import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { type ItemProps, Item } from "./Item";

type Props = { onPress: () => void } & ItemProps;
export const Tappable = (props: Props) => {
  const { source, iconName, badgeName, heading, subtitle, onPress } = props;
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
