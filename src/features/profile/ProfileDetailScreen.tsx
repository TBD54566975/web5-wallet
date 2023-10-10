import React, { useState } from "react";
import { BadgeNames } from "@/components/Item";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { View, Text, StyleSheet } from "react-native";
import { Tappable } from "../../components/Tappable";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID, formatDate } from "@/util/formatters";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { AppNavigatorProps } from "@/types/navigation";
import { useProfile } from "@/features/profile/hooks";
import Loader from "@/components/Loader";
import { mockConnections } from "@/features/connect/mocks";

const tabLabels = ["About", "Connections", "Activity"];

type Props = AppNavigatorProps<"ProfileDetailScreen">;
const ProfileDetailScreen = ({ navigation, route }: Props) => {
  const { identity } = route.params;

  const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const { data: profile, isLoading: isLoadingProfile } = useProfile(identity);

  const navigateToReviewConnection = () => {
    navigation.navigate("ReviewConnectionScreen");
  };

  return (
    <MenuPageLayout
      headerItem={{
        heading: identity.name,
        iconName: "hash",
        badgeName: BadgeNames.PROFILE,
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
          (isLoadingProfile || !profile ? (
            <Loader />
          ) : (
            <>
              <LabelValueItem label="Profile label" value={profile.name} />
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
              <Text style={Typography.body2}>{identity.name}</Text> is connected
              to the following apps and services.
            </Text>

            {mockConnections?.map((connection, index) => (
              <Tappable
                key={index}
                heading={connection.name}
                iconName={connection.icon}
                badgeName={BadgeNames.CONNECTION}
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

export default ProfileDetailScreen;
