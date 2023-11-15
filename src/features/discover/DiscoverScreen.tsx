import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { MockCredential, MockConnection } from "../../types/models";
import { TabNavigatorProps } from "../../types/navigation";
import { mockConnections } from "../connect/mocks";
import { mockCredentials } from "../credentials/mocks";

type Props = TabNavigatorProps<"DiscoverScreen">;
export const DiscoverScreen = ({ navigation }: Props) => {
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={Typography.heading4}>Get a new credential</Text>
        <View style={styles.row}>
          {mockCredentials.map((credential, index) => {
            // TODO: don't index by key
            return (
              <Tappable
                key={index}
                heading={credential.name}
                subtitle={`Issued by ${credential.issuer}`}
                body={credential.description}
                iconName={credential.icon}
                badgeName={"id-badge"}
                onPress={() => navigateToAddCredentialDetail(credential)}
              />
            );
          })}
        </View>
        <Text style={Typography.heading4}>Our favorite Web5 Apps</Text>
        <View style={styles.row}>
          {mockConnections.map((connection, index) => {
            // TODO: don't key by index
            return (
              <Tappable
                key={index}
                heading={connection.name}
                iconName={connection.icon}
                badgeName={"webhook"}
                onPress={() => navigateToConnectionDetail(connection)}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { margin: SPACE.BASE, gap: SPACE.LARGE },
  row: { gap: SPACE.LARGE },
});
