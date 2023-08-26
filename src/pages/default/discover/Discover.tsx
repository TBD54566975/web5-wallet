import React from "react";
import { Text, DevSettings, ScrollView } from "react-native";
import { userProfiles } from "@/services/profile.service";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { Typography } from "@/theme/typography";
import { Tappable } from "@/pages/default/Tappable";
import { Button } from "@/components/Button";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";
import { ItemProps } from "@/components/Item";

const DiscoverScreen = ({ navigation }) => {
  const resetProfiles = () => {
    userProfiles.set([]);
    DevSettings.reload();
  };

  const navigateToAddCredentialDetail = () => {
    navigation.navigate("AddCredentialDetail");
  };

  const navigateToConnectionDetail = () => {
    navigation.navigate("ConnectionDetail");
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
            const options: ItemProps = credential; //will transform this
            return (
              <Tappable
                options={options}
                onPress={navigateToAddCredentialDetail}
              />
            );
          }}
        </For>
        <Text style={Typography.heading4}>Our favorite Web5 Apps</Text>
        <For each={availableWeb5Apps}>
          {(availableWeb5App) => {
            const web5App = availableWeb5App.get();
            if (!web5App) {
              return <></>;
            }
            const options: ItemProps = web5App; //will transform this
            return (
              <Tappable
                options={options}
                onPress={navigateToConnectionDetail}
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

const mockCredentials: ItemProps[] = [
  {
    heading: "U.S. Passport",
    subtitle: "U.S. State Department",
    body: "Accepted by law everywhere your physical passport is required",
    iconName: "archive",
    badgeName: "id-badge",
  },
  {
    heading: "KYC Credential",
    subtitle: "TBD (Block Inc.)",
    body: "Meets KYC requirements of most PFIs in the tbDEX network",
    iconName: "issue-closed",
    badgeName: "id-badge",
  },
];

const mockWeb5Apps: ItemProps[] = [
  {
    heading: "DIDPay",
    subtitle: "did:ion:...8471",
    iconName: "credit-card",
    badgeName: "webhook",
  },
];

const availableCredentials =
  observable<typeof mockCredentials>(mockCredentials);
const availableWeb5Apps = observable<typeof mockWeb5Apps>(mockWeb5Apps);
