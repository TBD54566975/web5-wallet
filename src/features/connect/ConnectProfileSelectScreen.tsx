import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { mockProfileCredentials } from "../credentials/mocks";
import { Typography } from "@/theme/typography";
import { SPACE } from "@/theme/layouts";
import { Avatar } from "@/components/Avatar";

const ConnectProfileSelectScreen = () => {
  return (
    <SafeAreaView style={styles.flx}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={Typography.heading3}>
            Choose the profiles you’d like to connect to Dwitter
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={Typography.paragraph2}>
            Youll be able to use the profiles you select below in Dwitter.
          </Text>
          <>
            {mockProfileCredentials.map((profile, index) => {
              return (
                <View key={index}>
                  <Avatar iconName={profile.iconName} />
                </View>
              );
            })}
          </>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flx: { flex: 1 },
  container: { padding: SPACE.MEDIUM, flex: 1, gap: SPACE.BASE },
  header: {},
  body: { flex: 1, gap: SPACE.LARGE },
});

export default ConnectProfileSelectScreen;
