import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { LabelValueItem } from "../../components/LabelValue";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { formatDID } from "../../utils/formatters";
import { mockProfileCredentials } from "../credentials/mocks";
import { mockConnections } from "./mocks";
import type { AppNavigatorProps } from "../../types/navigation";

const tabLabels = ["About", "Connections", "Activity"];

type Props = AppNavigatorProps<"ConnectionDetailScreen">;
export const ConnectionDetailScreen = ({ navigation, route }: Props) => {
  const { heading, iconName } = route.params;
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const navigateToReviewConnection = () => {
    navigation.navigate("ReviewConnectionScreen");
  };

  const connection = mockConnections[0];

  return (
    <MenuPageLayout
      headerItem={{
        heading: heading,
        iconName: iconName,
        badgeName: "webhook",
      }}
      menuTabs={tabLabels.map((label) => {
        return {
          label,
          isActiveTab: activeTab === label,
          onPress: () => setActiveTab(label),
        };
      })}
    >
      <View style={styles.row}>
        {activeTab === tabLabels[0] && (
          <>
            <LabelValueItem label="DID" value={formatDID(connection.id)} />
            <LabelValueItem label="Developer" value={connection.developer} />
            <LabelValueItem
              label="Description"
              value={connection.description}
            />
          </>
        )}
        {activeTab === tabLabels[1] && (
          <>
            <Text style={Typography.body4}>
              {heading} is connected to the following profiles.
            </Text>

            {mockProfileCredentials.map((profile, index) => {
              // TODO: don't key by index
              return (
                <Tappable
                  key={index}
                  heading={profile.subtitle}
                  iconName={profile.iconName}
                  badgeName={"feed-person"}
                  onPress={() => navigateToReviewConnection()}
                />
              );
            })}
          </>
        )}
        {activeTab === tabLabels[2] && <></>}
      </View>
    </MenuPageLayout>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: SPACE.LARGE,
  },
});
