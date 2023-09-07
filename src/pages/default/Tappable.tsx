import { Item, ItemProps } from "@/components/Item";
import React from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { Layouts } from "@/theme/layouts";

export const Tappable = (props: { options: ItemProps } & PressableProps) => {
  const { options, ...pressableProps } = props;

  return (
    <View style={Layouts.row}>
      <Pressable style={TappableStyles.row} {...pressableProps}>
        <View style={TappableStyles.textContainer}>
          <Item {...options} />
        </View>
        <View style={TappableStyles.iconContainer}>
          <Octicons name="chevron-right" size={24} />
        </View>
      </Pressable>
    </View>
  );
};

const TappableStyles = StyleSheet.create({
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
