import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ColorTheme } from "@/theme/colors";
import { SPACE } from "@/theme/layouts";

type Props = { children: React.ReactNode };
export const ParentPageLayout = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme.PRIMARY,
    flex: 1,
  },
  inner: {
    backgroundColor: ColorTheme.DEFAULT_CONTRAST,
    paddingTop: SPACE.XXLARGE,
    flex: 1,
    padding: SPACE.BASE,
  },
});
