import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { For } from "@legendapp/state/react";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Tappable } from "../Tappable";
import { observable } from "@legendapp/state";
import { mockCredentials } from "@/services/mocks";
import type { MockCredential } from "@/types/models";
import { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"AddCredentialsScreen">;
const AddCredentialsScreen = ({ navigation }: Props) => {
  const navigateToAddCredentialDetail = (credential: MockCredential) => {
    navigation.navigate("AddCredentialDetailScreen", { credential });
  };

  return (
    <SafeAreaView style={FlexLayouts.wrapper}>
      <View style={[Layouts.container, FlexLayouts.wrapper]}>
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

              return (
                <Tappable
                  heading={credential.name}
                  subtitle={`Issued by ${credential.issuer}`}
                  iconName={credential.icon}
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
