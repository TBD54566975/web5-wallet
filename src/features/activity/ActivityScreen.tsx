import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SPACE } from "../../theme/layouts";
import { mockActivity } from "./mocks";
import { Activity } from "./components/Activity";

export const ActivityScreen = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          {mockActivity.map((activity, index) => {
            // TODO: do not key by index
            return <Activity key={index} {...activity} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
});
