import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { ScrollView } from "react-native";
import { For } from "@legendapp/state/react";
import { Tappable } from "@/pages/default/Tappable";
import { observable } from "@legendapp/state";
import { BadgeNames, ItemProps } from "@/components/Item";

const ConnectionsScreen = ({ navigation }) => {
  const navigateToItem = (connection) => {
    navigation.navigate("ConnectionDetail", { connection });
  };

  return (
    <ParentPageLayout>
      <ScrollView>
        <For each={profileConnections}>
          {(profileConnection) => {
            const connection = profileConnection.get();
            if (!connection) {
              return <></>;
            }
            const options: ItemProps = connection; // will transform this
            return (
              <Tappable
                options={options}
                onPress={() => navigateToItem(connection)}
              />
            );
          }}
        </For>
      </ScrollView>
    </ParentPageLayout>
  );
};

export default ConnectionsScreen;

const mockProfileConnections: ItemProps[] = [
  {
    heading: "DIDPay",
    subtitle: "Connected to Social profile",
    iconName: "credit-card",
    badgeName: BadgeNames.CONNECTION,
  },
  {
    heading: "Dignal",
    subtitle: "Connected to 2 profiles",
    iconName: "comment-discussion",
    badgeName: BadgeNames.CONNECTION,
  },
  {
    heading: "Dinder",
    subtitle: "Connected to Social profile",
    iconName: "flame",
    badgeName: BadgeNames.CONNECTION,
  },
  {
    heading: "Dwitter",
    subtitle: "Connected to Social profile",
    iconName: "x",
    badgeName: BadgeNames.CONNECTION,
  },
];

const profileConnections = observable<typeof mockProfileConnections>(
  mockProfileConnections
);
