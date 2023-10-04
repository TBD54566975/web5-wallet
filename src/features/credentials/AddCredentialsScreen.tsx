import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Tappable } from "../../components/Tappable";
import type { MockCredential } from "@/types/models";
import { AppNavigatorProps } from "@/types/navigation";
import { mockCredentials } from "@/features/credentials/mocks";

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
          {mockCredentials.map((credential, index) => {
            // TODO: don't key by index
            return (
              <Tappable
                key={index}
                heading={credential.name}
                subtitle={`Issued by ${credential.issuer}`}
                iconName={credential.icon}
                onPress={() => navigateToAddCredentialDetail(credential)}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddCredentialsScreen;
