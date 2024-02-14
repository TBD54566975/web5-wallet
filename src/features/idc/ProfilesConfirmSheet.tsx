import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import { Item } from "../../components/Item";
import { SPACE } from "../../theme/layouts";

export type ProfileConfirmSheetProps = {
  onProfilesUnconfirm: () => void;
  onProfilesConfirm: () => void;
};
export const ProfilesConfirmSheet = ({
  onProfilesConfirm,
  onProfilesUnconfirm,
}: ProfileConfirmSheetProps) => {
  return (
    <>
      <Text style={Typography.heading1}>Confirm Application</Text>
      <Text>
        Your credential application is ready to submit. If approved, credentials
        will be issued to the following profiles:
      </Text>
      <Item heading="Professional" body="Bo Jangles" iconName="person" />
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Back"
          style={styles.btn}
          onPress={onProfilesUnconfirm}
        />
        <Button
          kind={"primary"}
          text="Next"
          style={styles.btn}
          onPress={onProfilesConfirm}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: "row",
    gap: SPACE.SMALL,
  },
  btn: { flex: 1 },
});
