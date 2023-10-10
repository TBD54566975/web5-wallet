import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Tappable } from "@/components/Tappable";
import { Button } from "@/components/Button";
import { SPACE } from "@/theme/layouts";
import { ItemProps } from "@/components/Item";
import { TabNavigatorProps } from "@/types/navigation";
import { mockProfileCredentials } from "@/features/credentials/mocks";

type Props = TabNavigatorProps<"CredentialsScreen">;
const CredentialsScreen = ({ navigation }: Props) => {
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

export default CredentialsScreen;
