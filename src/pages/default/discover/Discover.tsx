import React from "react";
import { Text, DevSettings, ScrollView } from "react-native";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Typography } from "@/theme/typography";
import { Tappable } from "@/pages/default/Tappable";
import { Button } from "@/components/Button";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";
import { BadgeNames, ItemProps } from "@/components/Item";
import { mockConnections, mockCredentials } from "@/services/mocks";
import { profilesAtom } from "@/features/identity/atoms";

const DiscoverScreen = ({ navigation }) => {
  const resetProfiles = () => {
    profilesAtom.set([]);
    DevSettings.reload();
  };

  const navigateToAddCredentialDetail = (credential) => {
    navigation.navigate("AddCredentialDetail", { credential });
  };

  const navigateToConnectionDetail = (connection) => {
    navigation.navigate("ConnectionDetail", { connection });
  };

  return (
    <ParentPageLayout>
      <ScrollView>
        <Text style={Typography.heading4}>Get a new credential</Text>
        <For each={availableCredentials}>
          {(availableCredential) => {
            const credential = availableCredential.get();
            if (!credential) {
              return <></>;
            }
            const options: ItemProps = {
              heading: credential.name,
              subtitle: `Issued by ${credential.issuer}`,
              body: credential.description,
              iconName: credential.icon as ItemProps["iconName"],
              badgeName: BadgeNames.CREDENTIAL,
            };
            return (
              <Tappable
                options={options}
                onPress={() => navigateToAddCredentialDetail(credential)}
              />
            );
          }}
        </For>
        <Text style={Typography.heading4}>Our favorite Web5 Apps</Text>
        <For each={availableConnections}>
          {(availableConnection) => {
            const connection = availableConnection.get();
            if (!connection) {
              return <></>;
            }
            const options: ItemProps = {
              heading: connection.name,
              iconName: connection.icon as ItemProps["iconName"],
              badgeName: BadgeNames.CONNECTION,
            };
            return (
              <Tappable
                options={options}
                onPress={() => navigateToConnectionDetail(connection)}
              />
            );
          }}
        </For>
        <Button kind="secondary" onPress={resetProfiles}>
          Reset Profile
        </Button>
      </ScrollView>
    </ParentPageLayout>
  );
};

export default DiscoverScreen;

const availableCredentials =
  observable<typeof mockCredentials>(mockCredentials);
const availableConnections =
  observable<typeof mockConnections>(mockConnections);
