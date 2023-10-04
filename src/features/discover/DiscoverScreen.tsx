import React from "react";
import { Text, ScrollView } from "react-native";
import { ParentPageLayout } from "@/components/ParentPageLayout";
import { Typography } from "@/theme/typography";
import { Tappable } from "@/components/Tappable";
import { BadgeNames } from "@/components/Item";
import { mockConnections } from "@/features/connect/mocks";
import { mockCredentials } from "@/features/credentials/mocks";
import type { MockCredential, MockConnection } from "@/types/models";
import type { TabNavigatorProps } from "@/types/navigation";

type Props = TabNavigatorProps<"DiscoverScreen">;
const DiscoverScreen = ({ navigation }: Props) => {
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

        {mockCredentials.map((credential, index) => {
          // TODO: don't index by key
          return (
            <Tappable
              key={index}
              heading={credential.name}
              subtitle={`Issued by ${credential.issuer}`}
              body={credential.description}
              iconName={credential.icon}
              badgeName={BadgeNames.CREDENTIAL}
              onPress={() => navigateToAddCredentialDetail(credential)}
            />
          );
        })}

        <Text style={Typography.heading4}>Our favorite Web5 Apps</Text>

        {mockConnections.map((connection, index) => {
          // TODO: don't key by index
          return (
            <Tappable
              key={index}
              heading={connection.name}
              iconName={connection.icon}
              badgeName={BadgeNames.CONNECTION}
              onPress={() => navigateToConnectionDetail(connection)}
            />
          );
        })}
      </ScrollView>
    </ParentPageLayout>
  );
};

export default DiscoverScreen;
