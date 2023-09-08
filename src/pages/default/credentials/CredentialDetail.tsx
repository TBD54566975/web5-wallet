import { LabelValueItem } from "@/components/LabelValue";
import React, { useState } from "react";
import { MenuPageLayout } from "../MenuPageLayout";
import { Button } from "@/components/Button";
import { BadgeNames } from "@/components/Item";
import { formatDate } from "@/util/formatters";

const CredentialDetailScreen = ({ route }) => {
  const tabLabels = ["About", "Activity"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const {
    heading: credentialName,
    subtitle: issuerName,
    iconName: icon,
  } = route.params.credential;

  const credential = {
    status: "Valid",
    dateAcquired: "Sat July 31 2023",
    firstName: "Alexander",
    lastName: "Nakamoto",
    dateOfBirth: "Sat Jan 1 1990",
    address: "101 Main St",
  };

  return (
    <MenuPageLayout
      headerItem={{
        heading: credentialName,
        subtitle: `Issued by ${issuerName}`,
        iconName: icon,
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
        <>
          <LabelValueItem label="Status" value={credential.status} />
          <LabelValueItem
            label="Date acquired"
            value={formatDate(credential.dateAcquired)}
          />
          <LabelValueItem label="First name" value={credential.firstName} />
          <LabelValueItem label="Last name" value={credential.lastName} />
          <LabelValueItem
            label="Date of birth"
            value={credential.dateOfBirth}
          />
          <LabelValueItem label="Address" value={credential.address} />
        </>
      )}
      {activeTab === tabLabels[1] && <></>}
      <Button kind="primary">Present</Button>
    </MenuPageLayout>
  );
};

export default CredentialDetailScreen;
