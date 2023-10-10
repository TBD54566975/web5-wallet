import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { SPACE } from "@/theme/layouts";

const Loader = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    padding: SPACE.BASE,
    justifyContent: "center",
  },
});

export default Loader;
