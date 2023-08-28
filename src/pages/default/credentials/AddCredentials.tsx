import { BadgeNames, ItemProps } from "@/components/Item";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { For } from "@legendapp/state/react";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Tappable } from "../Tappable";
import { observable } from "@legendapp/state";
import { mockCredentials } from "@/services/mocks";

const AddCredentialsScreen = ({ navigation }) => {
  const navigateToAddCredentialDetail = (credential) => {
    navigation.navigate("AddCredentialDetail", { credential });
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
              const options: ItemProps = {
                heading: credential.name,
                subtitle: `Issued by ${credential.issuer}`,
                iconName: credential.icon as ItemProps["iconName"],
                badgeName: BadgeNames.CREDENTIAL,
              };
              return (
                <Tappable
                  options={options}
                  onPress={() => navigateToAddCredentialDetail(credential)}
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

const availableCredentials =
  observable<typeof mockCredentials>(mockCredentials);
