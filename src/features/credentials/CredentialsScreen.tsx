import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ItemProps } from "../../components/Item";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import { mockProfileCredentials } from "./mocks";
import { Button } from "../../components/Button";
import type { TabNavigatorProps } from "../../types/navigation";

type Props = TabNavigatorProps<"CredentialsScreen">;
export const CredentialsScreen = ({ navigation }: Props) => {
  const navigateToItem = (credential: ItemProps) => {
    navigation.navigate("CredentialDetailScreen", {
      heading: credential.heading,
      subtitle: credential.subtitle ?? "",
      iconName: credential.iconName ?? "hash",
    });
  };

  const navigateToAddCredentials = () => {
    navigation.navigate("AddCredentialsScreen");
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          {mockProfileCredentials.map((credential, index) => {
            // TODO: don't key by index
            return (
              <Tappable
                key={index}
                iconName={credential.iconName}
                badgeName={credential.badgeName}
                heading={credential.heading}
                subtitle={credential.subtitle}
                onPress={() => navigateToItem(credential)}
              />
            );
          })}
          <Button
            kind="primary"
            onPress={navigateToAddCredentials}
            text="Get a new credential"
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
