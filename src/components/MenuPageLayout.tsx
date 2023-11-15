import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
} from "react-native";
import { ColorTheme } from "../theme/colors";
import { SPACE } from "../theme/layouts";
import { Typography } from "../theme/typography";
import { ItemProps, Item } from "./Item";

export const MenuPageLayout = (props: {
  headerItem: ItemProps;
  menuTabs: MenuProps[];
  children: React.ReactNode;
}) => {
  const { headerItem, menuTabs, children } = props;

  return (
    <View style={styles.container}>
      <Item {...headerItem} headingSize="heading3" />
      <View style={styles.menu}>
        {menuTabs?.map((tab, index) => (
          <MenuTab {...tab} key={index} />
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  );
};

type MenuProps = { isActiveTab: boolean; label: string } & PressableProps;

const MenuTab = (props: MenuProps) => {
  return (
    <Pressable {...props} style={props.isActiveTab ? styles.activeTab : null}>
      <Text style={props.isActiveTab ? styles.activeText : styles.inactiveText}>
        {props.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.BASE,
    gap: SPACE.LARGE,
  },
  menu: {
    flexDirection: "row",
    gap: 32,
  },
  activeTab: {
    borderBottomWidth: 4,
    paddingBottom: 8,
  },
  activeText: Typography.body3,
  inactiveText: {
    color: ColorTheme.MUTED,
    ...Typography.body3,
  },
});
