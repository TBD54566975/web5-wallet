import { ColorTheme } from "@/theme/colors";
import { Layouts, Space } from "@/theme/layouts";
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
    paddingTop: Space.XXLARGE,
    flex: 1,
    borderTopLeftRadius: Space.XXLARGE,
    borderTopRightRadius: Space.XXLARGE,
    ...Layouts.container,
  },
});
