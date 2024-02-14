import React from "react";
import { StyleSheet, Text } from "react-native";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";

type CredentialApplicationSuccessSheet = { onSuccess: () => void };
export const CredentialApplicationSuccessSheet = ({
  onSuccess,
}: CredentialApplicationSuccessSheet) => {
  return (
    <>
      <Text style={Typography.heading1}>Application Submitted</Text>
      <Text>Your credential application is submitted.</Text>
      <Button
        kind={"primary"}
        text="Close"
        style={styles.flx}
        onPress={onSuccess}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flx: { flex: 1 },
});
