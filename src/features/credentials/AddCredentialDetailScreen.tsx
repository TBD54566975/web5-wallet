import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { Avatar } from "../../components/Avatar";
import { ColorTheme } from "../../theme/colors";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { MockCredential } from "../../types/models";
import type { AppNavigatorProps } from "../../types/navigation";
import { mockCredentials } from "./mocks";
import { Button } from "../../components/Button";

type Props = AppNavigatorProps<"AddCredentialDetailScreen">;
export const AddCredentialDetailScreen = ({ navigation, route }: Props) => {
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
          <Avatar iconName="note" badgeName={"id-badge"} />
          <Text style={styles.headingNameText}>{credential.name}</Text>
          <Text style={styles.headerIssuerText}>
            Issued by {credential.issuer}
          </Text>
        </View>

        <Text style={Typography.body4}>{credential.description}</Text>
        <View style={styles.callout}>
          <Text style={styles.labelText}>Credentials required</Text>
          <View style={styles.row}>
            <View style={[styles.checkbox, styles.success]}>
              <Octicons name="check" size={16} color={ColorTheme.SUCCESS} />
            </View>
            <View>
              <Text style={Typography.body1}>{mockCredentials[1].name}</Text>
              <Text style={styles.successText}>You have this credential</Text>
            </View>
          </View>
          <View style={styles.rowErrorCheck}>
            <View style={styles.errorRowContainer}>
              <View style={[styles.checkbox, styles.danger]}>
                <Octicons name="x" size={16} color={ColorTheme.DANGER} />
              </View>
              <View>
                <Text style={Typography.body1}>{mockCredentials[2].name}</Text>
                <Text style={styles.dangerText}>
                  You don&apos;t have this credential
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
  column: { alignItems: "center" },
  row: { flexDirection: "row", gap: 8 },
  rowErrorCheck: { flexDirection: "row" },
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
