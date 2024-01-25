import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { LabelValueItem } from "../../components/LabelValue";
import { SPACE } from "../../theme/layouts";
import { type AppNavigatorProps } from "../../types/navigation";
import { formatDate } from "../../utils/formatters";

const tabLabels = ["About", "Activity"];

type Props = AppNavigatorProps<"CredentialDetailScreen">;
export const CredentialDetailScreen = ({ route }: Props) => {
  const { heading, subtitle, iconName } = route.params;
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  return (
    <MenuPageLayout
      headerItem={{
        heading: heading,
        subtitle: `Issued by ${subtitle}`,
        iconName: iconName,
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
        <View style={styles.column}>
          <LabelValueItem label="Status" value={"Valid"} />
          <LabelValueItem label="Issuer" value={heading} />
          <LabelValueItem label="Subject" value={subtitle} />
          <LabelValueItem
            label="Date acquired"
            value={formatDate(new Date().toDateString())}
          />
        </View>
      )}
      {activeTab === tabLabels[1] && <></>}
    </MenuPageLayout>
  );
};

const styles = StyleSheet.create({
  column: { gap: SPACE.MEDIUM },
});
