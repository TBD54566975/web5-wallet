import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import { mockConnections } from "./mocks";
import { Button } from "../../components/Button";
import type { MockConnection } from "../../types/models";
import type { TabNavigatorProps } from "../../types/navigation";

type Props = TabNavigatorProps<"ConnectionsScreen">;
export const ConnectionsScreen = ({ navigation }: Props) => {
  const navigateToItem = (connection: MockConnection) => {
    navigation.navigate("ConnectionDetailScreen", {
      heading: connection.name,
      iconName: connection.icon ?? "hash",
    });
  };

  const navigateAddConnection = () => {
    navigation.navigate("ConnectQRScanScreen");
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          {mockConnections.map((connection, index) => {
            // TODO: don't key by index
            return (
              <Tappable
                key={index}
                heading={connection.name}
                subtitle={connection.description}
                iconName={connection.icon}
                badgeName={"webhook"}
                onPress={() => navigateToItem(connection)}
              />
            );
          })}
          <Button
            kind="primary"
            onPress={navigateAddConnection}
            text="Connect"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
});
