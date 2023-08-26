import { Item, ItemProps } from "@/components/Item";
import { ColorTheme } from "@/theme/colors";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
} from "react-native";

export const MenuPageLayout = (props: {
  headerItem: ItemProps;
  menuTabs: MenuProps[];
  children;
}) => {
  const { headerItem, menuTabs, children } = props;

  return (
    <SafeAreaView>
      <View style={Layouts.container}>
        <View style={Layouts.row}>
          <Item {...headerItem} headingSize="heading3" />
        </View>
        <View style={MenuPageStyles.menu}>
          {menuTabs?.map((tab, index) => (
            <MenuTab {...tab} key={index} />
          ))}
        </View>
        <ScrollView style={MenuPageStyles.container}>{children}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

type MenuProps = { isActiveTab; label } & PressableProps;

const MenuTab = (props: MenuProps) => {
  return (
    <Pressable
      {...props}
      style={props.isActiveTab ? MenuPageStyles.activeTab : null}
    >
      <Text
        style={
          props.isActiveTab
            ? MenuPageStyles.activeText
            : MenuPageStyles.inactiveText
        }
      >
        {props.label}
      </Text>
    </Pressable>
  );
};

const MenuPageStyles = StyleSheet.create({
  container: {
    marginBottom: 240,
  },
  menu: {
    flexDirection: "row",
    gap: 32,
    paddingBottom: 20,
  },
  activeTab: {
    borderBottomWidth: 4,
    paddingBottom: 8,
  },
  activeText: {
    ...Typography.body3,
  },
  inactiveText: {
    color: ColorTheme.MUTED,
    ...Typography.body3,
  },
});
