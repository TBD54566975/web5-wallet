import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  type PresentationDefinitionV2,
  PresentationExchange,
} from "@web5/credentials";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import { credentialStore } from "../credentials/atoms";
import { Checkable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";

type CredentialSelectSheetProps = {
  onCancel: () => void;
  attachmentRequirements: {
    requiredCredential: string;
    presentationDefinition: PresentationDefinitionV2;
  };
  onCredentialSelect: (credential: any, requiredCredential: string) => void;
};

export const CredentialSelectSheet = ({
  onCancel,
  attachmentRequirements,
  onCredentialSelect,
}: CredentialSelectSheetProps) => {
  const requiredCredential = attachmentRequirements.requiredCredential;
  const presentationDefinition = attachmentRequirements.presentationDefinition;
  const matchingCreds = PresentationExchange.selectCredentials({
    vcJwts: [...credentialStore.keys()],
    presentationDefinition,
  });
  const hasMatchingCreds = Boolean(matchingCreds.length);
  const [selectedCredential, setSelectedCredential] = useState<string | null>(
    null
  );

  if (!hasMatchingCreds) {
    <>
      <Text style={Typography.heading1}>Credential required</Text>
      <Text>
        To proceed you are required to provide a credential for
        {requiredCredential}. Please check with the issuer to find out how to
        obtain the required credential.
      </Text>
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Cancel"
          style={styles.flx}
          onPress={onCancel}
        />
      </View>
    </>;
  }

  return (
    <>
      <Text style={Typography.heading1}>Attach required credential</Text>
      <Text>
        You are being requested to provide a credential for {requiredCredential}
      </Text>

      <Text>Please select the credential you would like to use:</Text>
      {[...credentialStore].map(([vcJwt, credential], index) => {
        const cred: Record<string, any> = credential.vcDataModel;
        delete cred.credentialSubject.id;

        return (
          <Checkable
            key={index}
            checked={selectedCredential === vcJwt}
            onPress={() => setSelectedCredential(vcJwt)}
            heading={cred.type[1]}
            subtitle={JSON.stringify(Object.values(cred.credentialSubject))}
          />
        );
      })}
      <View style={styles.btnRow}>
        <Button
          kind="secondary"
          text="Cancel"
          style={styles.flx}
          onPress={onCancel}
        />
        <Button
          disabled={selectedCredential === null}
          kind="primary"
          text="Attach"
          style={styles.flx}
          onPress={() => {
            if (selectedCredential !== null) {
              onCredentialSelect(selectedCredential, requiredCredential);
            }
          }}
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
