import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { FlexLayouts, Layouts } from "@/theme/layouts";

const Loader = () => {
  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.containerVerticalCenter]}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
};

export default Loader;
