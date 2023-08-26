// import { LabelValueItem } from "@/components/LabelValue";
import React, { useState } from "react";
import { MenuPageLayout } from "../MenuPageLayout";
import { Button } from "@/components/Button";
// import { View } from "react-native";
// import { Button } from "@/components/Button";

const CredentialDetailScreen = ({ route }) => {
  const tabLabels = ["About", "Activity"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const {
    heading: credentialName,
    subtitle: issuerName,
    iconName: icon,
    // ...credential
  } = route.params.credential;

  return (
    <MenuPageLayout
      headerItem={{
        heading: credentialName,
        subtitle: `Issued by ${issuerName}`,
        iconName: icon,
        badgeName: "id-badge",
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
        <>
          {/* 
          <LabelValueItem label="Status" value={credential.status} />
          <LabelValueItem
            label="Date acquired"
            value={credential.dateAcquired}
          />
          <LabelValueItem label="First name" value={credential.firstName} />
          <LabelValueItem label="Last name" value={credential.lastName} />
          <LabelValueItem
            label="Date of birth"
            value={credential.dateOfBirth}
          />
          <LabelValueItem label="Address" value={credential.address} /> 
          */}
        </>
      )}
      {activeTab === tabLabels[1] && <></>}
      <Button kind="primary">Present</Button>
    </MenuPageLayout>
  );
};

export default CredentialDetailScreen;
