import { ItemProps } from "@/components/Item";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { For } from "@legendapp/state/react";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Tappable } from "../Tappable";
import { observable } from "@legendapp/state";

const AddCredentialsScreen = ({ navigation }) => {
  const navigateToAddCredentialDetail = () => {
    navigation.navigate("AddCredentialDetail");
  };

  return (
    <SafeAreaView>
      <View style={Layouts.container}>
        <View style={Layouts.row}>
          <Text style={Typography.heading3}>Get a new credential</Text>
        </View>
        <ScrollView>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddCredentialsScreen;

//TODO: Move this to common place - also consumed in Discovery

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

const availableCredentials =
  observable<typeof mockCredentials>(mockCredentials);
