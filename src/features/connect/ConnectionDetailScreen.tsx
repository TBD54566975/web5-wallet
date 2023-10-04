import React, { useState } from "react";
import { Text, View } from "react-native";
import { MenuPageLayout } from "../../components/MenuPageLayout";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID } from "@/util/formatters";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Tappable } from "../../components/Tappable";
import { BadgeNames } from "@/components/Item";
import { AppNavigatorProps } from "@/types/navigation";
import { mockConnections } from "@/features/connect/mocks";
import { mockProfileCredentials } from "@/features/credentials/mocks";

const tabLabels = ["About", "Connections", "Activity"];

type Props = AppNavigatorProps<"ConnectionDetailScreen">;
const ConnectionDetailScreen = ({ navigation, route }: Props) => {
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
        badgeName: BadgeNames.CONNECTION,
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
        <>
          <LabelValueItem label="DID" value={formatDID(connection.id)} />
          <LabelValueItem label="Developer" value={connection.developer} />
          <LabelValueItem label="Description" value={connection.description} />
        </>
      )}
      {activeTab === tabLabels[1] && (
        <>
          <View style={Layouts.row}>
            <Text style={Typography.body4}>
              <Text style={Typography.body2}>{heading}</Text> is connected to
              the following profiles.
            </Text>
          </View>

          {mockProfileCredentials.map((profile, index) => {
            // TODO: don't key by index
            return (
              <Tappable
                key={index}
                heading={profile.subtitle}
                iconName={profile.iconName}
                badgeName={BadgeNames.PROFILE}
                onPress={() => navigateToReviewConnection()}
              />
            );
          })}
        </>
      )}
      {activeTab === tabLabels[2] && <></>}
    </MenuPageLayout>
  );
};

export default ConnectionDetailScreen;
