import { Item, ItemProps } from "@/components/Item";
import { ColorTheme } from "@/theme/colors";
import { FlexLayouts, Layouts } from "@/theme/layouts";
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
  children: React.ReactNode;
}) => {
  const { headerItem, menuTabs, children } = props;

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.wrapper]}>
        <View style={Layouts.row}>
          <Item {...headerItem} headingSize="heading3" />
        </View>
        <View style={styles.menu}>
          {menuTabs?.map((tab, index) => (
            <MenuTab {...tab} key={index} />
          ))}
        </View>
        <ScrollView style={styles.container}>{children}</ScrollView>
      </View>
    </SafeAreaView>
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
