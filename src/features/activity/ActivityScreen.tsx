import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ItemStack } from "@/components/Item";
import { Layouts, SPACE } from "@/theme/layouts";
import { mockActivity } from "@/features/activity/mocks";

const ActivityScreen = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          {mockActivity.map((activity, index) => {
            // TODO: do not key by index
            return (
              <View style={Layouts.row} key={index}>
                <ItemStack {...activity} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: SPACE.BASE },
});

export default ActivityScreen;
