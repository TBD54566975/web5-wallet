import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { ScrollView, View } from "react-native";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";
import { Tappable } from "@/pages/default/Tappable";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { BadgeNames, ItemProps } from "@/components/Item";
import { TabNavigatorProps } from "@/types/navigation";

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
          <For each={profileCredentials}>
            {(profileCredential) => {
              const credential = profileCredential.get();
              if (!credential) {
                return <></>;
              }

              return (
                <Tappable
                  iconName={credential.iconName}
                  badgeName={credential.badgeName}
                  heading={credential.heading}
                  subtitle={credential.subtitle}
                  onPress={() => navigateToItem(credential)}
                />
              );
            }}
          </For>
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

const mockProfileCredentials = [
  {
    heading: "Driver's License",
    subtitle: "All profiles",
    body: "Valid",
    iconName: "note" as const,
    badgeName: BadgeNames.CREDENTIAL,
  },
  {
    heading: "Gym membership",
    subtitle: "Social profile",
    body: "Expired",
    iconName: "zap" as const,
    badgeName: BadgeNames.CREDENTIAL,
  },
  {
    heading: "Employer ID",
    subtitle: "Professional profile",
    body: "Valid",
    iconName: "organization" as const,
    badgeName: BadgeNames.CREDENTIAL,
  },
];

const profileCredentials = observable<typeof mockProfileCredentials>(
  mockProfileCredentials
);
