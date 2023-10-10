import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { BadgeNames } from "@/components/Item";
import { ColorTheme } from "@/theme/colors";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import Octicons from "@expo/vector-icons/Octicons";
import { mockCredentials } from "@/features/credentials/mocks";
import { Avatar } from "@/components/Avatar";
import type { MockCredential } from "@/types/models";
import type { AppNavigatorProps } from "@/types/navigation";

type Props = AppNavigatorProps<"AddCredentialDetailScreen">;
const AddCredentialDetailScreen = ({ navigation, route }: Props) => {
  const credential = route.params.credential;

  const navigateToAddCredentialOptions = () => {
    navigation.navigate("AddCredentialOptionsScreen", { credential });
  };

  const navigateToAddCredentialDetail = (
    secondaryCredential: MockCredential
  ) => {
    navigation.push("AddCredentialDetailScreen", {
      credential: secondaryCredential,
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.column}>
          <Avatar iconName="note" badgeName={BadgeNames.CREDENTIAL} />
          <Text style={Checklist.headingNameText}>{credential.name}</Text>
          <Text style={Checklist.headerIssuerText}>
            Issued by {credential.issuer}
          </Text>
        </View>

        <Text style={Typography.body4}>{credential.description}</Text>
        <View style={Checklist.callout}>
          <Text style={Checklist.labelText}>Credentials required</Text>
          <View style={styles.row}>
            <View style={[Checklist.checkbox, Checklist.success]}>
              <Octicons name="check" size={16} color={ColorTheme.SUCCESS} />
            </View>
            <View>
              <Text style={Typography.body1}>{mockCredentials[1].name}</Text>
              <Text style={Checklist.successText}>
                You have this credential
              </Text>
            </View>
          </View>
          <View style={styles.rowErrorCheck}>
            <View style={Checklist.errorRowContainer}>
              <View style={[Checklist.checkbox, Checklist.danger]}>
                <Octicons name="x" size={16} color={ColorTheme.DANGER} />
              </View>
              <View>
                <Text style={Typography.body1}>{mockCredentials[2].name}</Text>
                <Text style={Checklist.dangerText}>
                  You don&apos;t have this credential
                </Text>
              </View>
            </View>
            <View style={Checklist.buttonContainer}>
              <Button
                kind="primary"
                onPress={() =>
                  navigateToAddCredentialDetail(mockCredentials[2])
                }
                text="Get"
              />
            </View>
          </View>
        </View>
        <Button
          kind="primary"
          onPress={navigateToAddCredentialOptions}
          text="Get this credential"
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCredentialDetailScreen;

const styles = StyleSheet.create({
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
  column: { alignItems: "center" },
  row: { flexDirection: "row", gap: 8 },
  rowErrorCheck: { flexDirection: "row" },
});

const Checklist = StyleSheet.create({
  callout: {
    borderWidth: 4,
    borderRadius: 20,
    padding: SPACE.BASE,
    gap: SPACE.BASE / 2,
    borderColor: ColorTheme.DANGER,
  },
  success: {
    borderColor: ColorTheme.SUCCESS,
    color: ColorTheme.SUCCESS,
  },
  danger: {
    borderColor: ColorTheme.DANGER,
    color: ColorTheme.DANGER,
  },
  headingNameText: { ...Typography.heading2, textAlign: "center" },
  headerIssuerText: { ...Typography.body3, textAlign: "center" },
  labelText: { ...Typography.body4, color: ColorTheme.REDUCED },
  dangerText: { ...Typography.body4, color: ColorTheme.DANGER },
  successText: { ...Typography.body4, color: ColorTheme.SUCCESS },
  checkbox: {
    padding: SPACE.XXSMALL,
    borderWidth: 2,
    borderRadius: 2,
    height: SPACE.LARGE,
    width: SPACE.LARGE,
    alignItems: "center",
    justifyContent: "center",
  },
  errorRowContainer: {
    flexBasis: "67%",
    flexDirection: "row",
    gap: SPACE.BASE / 2,
  },
  buttonContainer: {
    flexBasis: "33%",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
