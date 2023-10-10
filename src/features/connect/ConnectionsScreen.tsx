import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Tappable } from "@/components/Tappable";
import { BadgeNames } from "@/components/Item";
import { Button } from "@/components/Button";
import { mockConnections } from "@/features/connect/mocks";
import type { TabNavigatorProps } from "@/types/navigation";
import { MockConnection } from "@/types/models";
import { SPACE } from "@/theme/layouts";

type Props = TabNavigatorProps<"ConnectionsScreen">;
const ConnectionsScreen = ({ navigation }: Props) => {
  const navigateToItem = (connection: MockConnection) => {
    navigation.navigate("ConnectionDetailScreen", {
      heading: connection.name,
      iconName: connection.icon ?? "hash",
    });
  };

  const navigateAddConnection = () => {
    navigation.navigate("AddConnectionScreen");
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
                badgeName={BadgeNames.CONNECTION}
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

export default ConnectionsScreen;
