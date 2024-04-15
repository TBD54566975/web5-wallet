import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LabelValueItem } from "../../components/LabelValue";
import { Loader } from "../../components/Loader";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { Tappable } from "../../components/Tappable";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import type { AppNavigatorProps } from "../../types/navigation";
import { formatDID, formatDate } from "../../utils/formatters";
import { mockConnections } from "../connect/mocks";

const tabLabels = ["About", "Connections", "Activity"];

type Props = AppNavigatorProps<"ProfileDetailScreen">;
export const ProfileDetailScreen = ({ navigation, route }: Props) => {
  const { profile } = route.params;

  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const navigateToReviewConnection = () => {
    navigation.navigate("ReviewConnectionScreen");
  };

  return (
    <MenuPageLayout
      headerItem={{
        heading: profile.displayName,
        iconName: "hash",
        badgeName: "feed-person",
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
        {activeTab === tabLabels[0] &&
          (!profile ? (
            <Loader />
          ) : (
            <>
              <LabelValueItem
                label="Profile label"
                value={profile?.displayName ?? ""}
              />
              <LabelValueItem
                label="Public display name"
                value={profile?.displayName ?? "Not Available"}
              />
              <LabelValueItem label="DID" value={formatDID(profile.did)} />
              <LabelValueItem
                label="Created on"
                value={formatDate(new Date().toString())}
              />
            </>
          ))}
        {activeTab === tabLabels[1] && (
          <>
            <Text style={Typography.body4}>
              <Text style={Typography.body2}>{profile.displayName}</Text> is
              connected to the following apps and services.
            </Text>

            {mockConnections?.map((connection, index) => (
              <Tappable
                key={index}
                heading={connection.name}
                iconName={connection.icon}
                badgeName={"webhook"}
                onPress={() => navigateToReviewConnection()}
              />
            ))}
          </>
        )}
        {activeTab === tabLabels[2] && <></>}
      </View>
    </MenuPageLayout>
  );
};

const styles = StyleSheet.create({
  row: { gap: SPACE.LARGE },
});
