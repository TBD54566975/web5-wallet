import { ColorTheme } from "@/theme/colors";
import { Layouts } from "@/theme/layouts";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export const ParentPageLayout = ({ children }) => {
  return (
    <SafeAreaView style={ParentPageLayoutTheme.container}>
      <View style={ParentPageLayoutTheme.inner}>{children}</View>
    </SafeAreaView>
  );
};

const ParentPageLayoutTheme = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme.PRIMARY,
    flex: 1,
  },
  inner: {
    backgroundColor: ColorTheme.DEFAULT_CONTRAST,
    paddingTop: 48,
    flex: 1,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    ...Layouts.container,
  },
});
