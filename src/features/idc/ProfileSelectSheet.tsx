import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Jwt } from "@web5/credentials";
import {
  type CheckList,
  ProfileSelectChecklist,
} from "../profile/components/ProfileSelectChecklist";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import { webviewRef } from "./webviewRef";
import { SPACE } from "../../theme/layouts";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";

type ProfileSelectSheetProps = {
  onCancel: () => void;
};
export const ProfileSelectSheet = ({ onCancel }: ProfileSelectSheetProps) => {
  const [checkList, setCheckList] = useState<CheckList>([]);
  const checkedItems = checkList.flatMap((listItem) =>
    listItem.checked ? listItem : []
  );
  const hasCheckedItems = Boolean(checkedItems.length);

  const buildDidResponseMessage = async () => {
    // TODO: after Frank updates KMS get the real key and sign
    const didJwtPromises = checkedItems.map((item) => {
      const web5 = IdentityAgentManager.web5(item.did);

      // sign with the agentDid until we need something different
      const bearerDid = web5.agent.agentDid;

      // 12 byte nonce
      // const nonce = crypto.randomBytes(12);
      // const nu8a = new Uint8Array(nonce);
      // const hexString = Buffer.from(nu8a).toString("hex");
      return Jwt.sign({
        signerDid: bearerDid,
        payload: {
          iss: bearerDid.uri,
          sub: bearerDid.uri,
        },
      });
    });

    const didJwts = await Promise.all(didJwtPromises);
    const stringifiedDidJwts = JSON.stringify(didJwts);

    if (stringifiedDidJwts) {
      return `document.dispatchEvent(new CustomEvent('DidsProvidedToWebView', { detail: '${stringifiedDidJwts}' }));`;
    }
  };

  const onNextPressed = async () => {
    const didResponse = await buildDidResponseMessage();

    // TODO: make declarative
    if (didResponse) {
      webviewRef.current?.injectJavaScript(didResponse);
    }
  };

  return (
    <>
      <Text style={Typography.heading1}>Select profiles</Text>
      <ProfileSelectChecklist
        setCheckList={setCheckList}
        checkList={checkList}
      />
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Cancel"
          style={styles.flx}
          onPress={onCancel}
        />
        <Button
          disabled={!hasCheckedItems}
          kind={"primary"}
          text="Next"
          style={styles.flx}
          onPress={onNextPressed}
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
  flx: { flex: 1 },
});
