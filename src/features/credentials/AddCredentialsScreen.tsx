import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SPACE } from "@/theme/layouts";
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
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={Typography.heading3}>Get a new credential</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    padding: SPACE.BASE,
  },
  container: {
    flex: 1,
    padding: SPACE.BASE,
    gap: SPACE.LARGE,
  },
});

export default AddCredentialsScreen;
