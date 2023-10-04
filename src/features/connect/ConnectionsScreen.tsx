import React from "react";
import { ScrollView } from "react-native";
import { ParentPageLayout } from "@/components/ParentPageLayout";
import { Tappable } from "@/components/Tappable";
import { BadgeNames } from "@/components/Item";
import { Button } from "@/components/Button";
import { mockConnections } from "@/features/connect/mocks";
import type { TabNavigatorProps } from "@/types/navigation";
import { MockConnection } from "@/types/models";

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
    <ParentPageLayout>
      <ScrollView>
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
      </ScrollView>
      <Button kind="primary" onPress={navigateAddConnection} text="Connect" />
    </ParentPageLayout>
  );
};

export default ConnectionsScreen;
