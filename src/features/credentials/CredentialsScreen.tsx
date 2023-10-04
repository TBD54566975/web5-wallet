import React from "react";
import { ParentPageLayout } from "@/components/ParentPageLayout";
import { ScrollView, View } from "react-native";
import { Tappable } from "@/components/Tappable";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
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
    <ParentPageLayout>
      <View style={FlexLayouts.containerButtonBottom}>
        <ScrollView>
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
        </ScrollView>
        <Button
          kind="primary"
          onPress={navigateToAddCredentials}
          text="Get a new credential"
        />
      </View>
    </ParentPageLayout>
  );
};

export default CredentialsScreen;
