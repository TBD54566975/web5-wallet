import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LabelValueItem } from "@/components/LabelValue";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { BadgeNames } from "@/components/Item";
import { formatDate } from "@/utils/formatters";
import { SPACE } from "@/theme/layouts";
import type { AppNavigatorProps } from "@/types/navigation";

const tabLabels = ["About", "Activity"];

type Props = AppNavigatorProps<"CredentialDetailScreen">;
const CredentialDetailScreen = ({ route }: Props) => {
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const { heading, subtitle, iconName } = route.params;

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
