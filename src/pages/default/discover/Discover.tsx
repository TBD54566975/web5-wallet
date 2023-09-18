import React from "react";
import { Text, DevSettings, ScrollView } from "react-native";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Typography } from "@/theme/typography";
import { Tappable } from "@/pages/default/Tappable";
import { Button } from "@/components/Button";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";
import { BadgeNames } from "@/components/Item";
import { mockConnections, mockCredentials } from "@/services/mocks";
import { profilesAtom } from "@/features/identity/atoms";
import type { MockCredential, MockConnection } from "@/types/models";
import type { TabNavigatorProps } from "@/types/navigation";

type Props = TabNavigatorProps<"DiscoverScreen">;
const DiscoverScreen = ({ navigation }: Props) => {
  const resetProfiles = () => {
    profilesAtom.set([]);
    DevSettings.reload();
  };

  const navigateToAddCredentialDetail = (credential: MockCredential) => {
    navigation.navigate("AddCredentialDetailScreen", { credential });
  };

  const navigateToConnectionDetail = (connection: MockConnection) => {
    navigation.navigate("ConnectionDetailScreen", {
      heading: connection.name,
      iconName: connection.icon,
    });
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

            return (
              <Tappable
                heading={credential.name}
                subtitle={`Issued by ${credential.issuer}`}
                body={credential.description}
                iconName={credential.icon}
                badgeName={BadgeNames.CREDENTIAL}
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

            return (
              <Tappable
                heading={connection.name}
                iconName={connection.icon}
                badgeName={BadgeNames.CONNECTION}
                onPress={() => navigateToConnectionDetail(connection)}
              />
            );
          }}
        </For>
        <Button kind="secondary" onPress={resetProfiles} text="Reset Profile" />
      </ScrollView>
    </ParentPageLayout>
  );
};

export default DiscoverScreen;

const availableCredentials = observable<MockCredential[]>(mockCredentials);
const availableConnections = observable<MockConnection[]>(mockConnections);
