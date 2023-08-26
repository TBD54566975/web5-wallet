import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { ScrollView } from "react-native";
import { For } from "@legendapp/state/react";
import { Tappable } from "@/pages/default/Tappable";
import { observable } from "@legendapp/state";
import { ItemProps } from "@/components/Item";

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
    badgeName: "webhook",
  },
  {
    heading: "Dignal",
    subtitle: "Connected to 2 profiles",
    iconName: "comment-discussion",
    badgeName: "webhook",
  },
  {
    heading: "Dinder",
    subtitle: "Connected to Social profile",
    iconName: "flame",
    badgeName: "webhook",
  },
  {
    heading: "Dwitter",
    subtitle: "Connected to Social profile",
    iconName: "x",
    badgeName: "webhook",
  },
];

const profileConnections = observable<typeof mockProfileConnections>(
  mockProfileConnections
);
