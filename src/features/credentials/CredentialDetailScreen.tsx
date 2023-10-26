import type { AppNavigatorProps } from "@/types/navigation";
import type  { DecodedVcJwt } from "@web5/credentials";

import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { LabelValueItem } from "@/components/LabelValue";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { BadgeNames } from "@/components/Item";
import { formatDate } from "@/utils/formatters";
import { SPACE } from "@/theme/layouts";
import { VerifiableCredential } from "@web5/credentials";


const tabLabels = ["About", "Activity"];

type Props = AppNavigatorProps<"CredentialDetailScreen">;
const CredentialDetailScreen = ({ route }: Props) => {
  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const [credValid, setCredValid] = useState('Pending');

  // NOTE: Replace with actual VC from database passed in from params, this is an example JWT that would be stored in the database with a web5 deep link
  const vcJwt = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImtpZCI6IiN6Nk1rdTVwWHBkMzdwcm9jMzgyNzVQR2I5MXJma283ZGFYd2JDN1FnOWN4NHFNbkIifQ.eyJpc3MiOiJkaWQ6a2V5Ono2TWt1NXBYcGQzN3Byb2MzODI3NVBHYjkxcmZrbzdkYVh3YkM3UWc5Y3g0cU1uQiIsInN1YiI6ImRpZDprZXk6ejZNa3U1cFhwZDM3cHJvYzM4Mjc1UEdiOTFyZmtvN2RhWHdiQzdRZzljeDRxTW5CIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwiaWQiOiJidGMtY3JlZGVudGlhbCIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rdTVwWHBkMzdwcm9jMzgyNzVQR2I5MXJma283ZGFYd2JDN1FnOWN4NHFNbkIiLCJpc3N1YW5jZURhdGUiOiIyMDIzLTEwLTI2VDE4OjA4OjI5WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImZpcnN0TmFtZSI6IkFsZXhhbmRlciIsImxhc3ROYW1lIjoiTmFrYW1vdG8iLCJkYXRlT2ZCaXJ0aCI6IlNhdCBKYW4gMSAxOTkwIiwiYWRkcmVzcyI6IjEwMSBNYWluIFN0In19fQ.UBeSL-KX_Wm8EjWabc_WL1WLk_zyES-g1FR3IeTF02SUu_kJy9I7M3xTPEYPcOaXbesP73W5IsXwrzNaybRkCA"
  const { heading, subtitle, iconName } = route.params;

  const decodedVC: DecodedVcJwt = VerifiableCredential.decode(vcJwt);
  const issuer = decodedVC.payload.iss
  const subject = decodedVC.payload.sub
  const dateAcquired = decodedVC.payload.vc.issuanceDate;

  // Note: Credential subject is dynamic data and these fields may not exist in every VC
  const credSubject = decodedVC.payload.vc.credentialSubject
  const { firstName, lastName, dateOfBirth, address} = credSubject as Record<string, any>;

  useEffect(() => {
    const verifyCredential = async () => {
      try {
        await VerifiableCredential.verify(vcJwt);
        setCredValid("Valid");
      } catch (error) {
        console.error("An error occurred during credential verification:", error);
        setCredValid("Not Valid");
      }
    }
    void verifyCredential();
  }, []);

  return (
    <MenuPageLayout
      headerItem={{
        heading: heading,
        subtitle: `Issued by ${subtitle}`,
        iconName: iconName,
        badgeName: BadgeNames.CREDENTIAL,
      }}
      menuTabs={tabLabels.map((label) => {
        return {
          label,
          isActiveTab: activeTab === label,
          onPress: () => setActiveTab(label),
        };
      })}
    >
      {activeTab === tabLabels[0] && (
        // This rendering of information should be mindful of the flexibility
        // of fields and how will map them to labels
        <View style={styles.column}>
          <LabelValueItem label="Status" value={credValid} />
          <LabelValueItem label="Issuer" value={issuer} />
          <LabelValueItem label="Subject" value={subject} />
          <LabelValueItem
            label="Date acquired"
            value={formatDate(dateAcquired)}
          />
          <LabelValueItem label="First name" value={firstName} />
          <LabelValueItem label="Last name" value={lastName} />
          <LabelValueItem
            label="Date of birth"
            value={dateOfBirth}
          />
          <LabelValueItem label="Address" value={address} />
        </View>
      )}
      {activeTab === tabLabels[1] && <></>}
    </MenuPageLayout>
  );
};

const styles = StyleSheet.create({
  column: { gap: SPACE.MEDIUM },
});

export default CredentialDetailScreen;
