import { Item, ItemProps } from "@/components/Item";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { Layouts } from "@/theme/layouts";

type Props = { onPress: () => void } & ItemProps;
export const Tappable = (props: Props) => {
  const { source, iconName, badgeName, heading, subtitle, onPress } = props;
  return (
    <View style={Layouts.row}>
      <Pressable style={TappableStyles.row} onPress={onPress}>
        <View style={TappableStyles.textContainer}>
          <Item
            iconName={iconName}
            badgeName={badgeName}
            source={source}
            heading={heading}
            subtitle={subtitle}
          />
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
