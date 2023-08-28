import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { ScrollView, View } from "react-native";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";
import { Tappable } from "@/pages/default/Tappable";
import { Button } from "@/components/Button";
import { FlexLayouts } from "@/theme/layouts";
import { BadgeNames, ItemProps } from "@/components/Item";

const CredentialsScreen = ({ navigation }) => {
  const navigateToItem = (credential) => {
    navigation.navigate("CredentialDetail", { credential });
  };

  const navigateToAddCredentials = () => {
    navigation.navigate("AddCredentials");
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
              const options: ItemProps = credential; // will transform this
              return (
                <Tappable
                  options={options}
                  onPress={() => navigateToItem(credential)}
                />
              );
            }}
          </For>
        </ScrollView>
        <Button kind="primary" onPress={navigateToAddCredentials}>
          Get a new credential
        </Button>
      </View>
    </ParentPageLayout>
  );
};

export default CredentialsScreen;

const mockProfileCredentials: ItemProps[] = [
  {
    heading: "Driver's License",
    subtitle: "All profiles",
    body: "Valid",
    iconName: "note",
    badgeName: BadgeNames.CREDENTIAL,
  },
  {
    heading: "Gym membership",
    subtitle: "Social profile",
    body: "Expired",
    iconName: "zap",
    badgeName: BadgeNames.CREDENTIAL,
  },
  {
    heading: "Employer ID",
    subtitle: "Professional profile",
    body: "Valid",
    iconName: "organization",
    badgeName: BadgeNames.CREDENTIAL,
  },
];

const profileCredentials = observable<typeof mockProfileCredentials>(
  mockProfileCredentials
);
