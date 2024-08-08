import React from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from "react-native";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import type { AppNavigatorProps } from "../../types/navigation";

type Props = AppNavigatorProps<"ConnectPinConfirmScreen">;
export const ConnectPinConfirmScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <Text style={Typography.heading3}>
            Almost done! Go back to Fllw and enter this pin:
          </Text>
          <Text style={styles.pin}>{route.params.pin}</Text>
          <View style={styles.footer}>
            <Button
              kind="primary"
              onPress={() => {
                navigation.replace("Tabs", { screen: "DiscoverScreen" });
              }}
              text="Close"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollview: { flexGrow: 1 },
  container: {
    padding: SPACE.MEDIUM,
    flex: 1,
    gap: SPACE.XXXLARGE,
  },
  footer: { marginTop: "auto" },
  pin: { fontWeight: "700", fontSize: 96, textAlign: "center" },
});
