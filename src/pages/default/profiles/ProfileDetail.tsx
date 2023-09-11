import React, { useState } from "react";
import { BadgeNames } from "@/components/Item";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { View, Text } from "react-native";
import { Tappable } from "../Tappable";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID, formatDate } from "@/util/formatters";
import { MenuPageLayout } from "../MenuPageLayout";
import { mockConnections } from "@/services/mocks";
import { AppNavigatorProps } from "@/types/navigation";

const tabLabels = ["About", "Connections", "Activity"];

type Props = AppNavigatorProps<"ProfileDetailScreen">;
const ProfileDetailScreen = ({ navigation, route }: Props) => {
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const navigateToReviewConnection = () => {
    navigation.navigate("ReviewConnectionScreen");
  };

  const { name, displayName, icon, id } = route.params.profile;

  return (
    <MenuPageLayout
      headerItem={{
        heading: name,
        subtitle: displayName,
        iconName: icon,
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
      {activeTab === tabLabels[0] && (
        <>
          <LabelValueItem label="Profile label" value={name} />
          <LabelValueItem label="Public display name" value={displayName} />
          <LabelValueItem label="DID" value={formatDID(id)} />
          <LabelValueItem
            label="Created on"
            value={formatDate(new Date().toString())}
          />
        </>
      )}
      {activeTab === tabLabels[1] && (
        <>
          <View style={Layouts.row}>
            <Text style={Typography.body4}>
              <Text style={Typography.body2}>{name}</Text> is connected to the
              following apps and services.
            </Text>
          </View>
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
    </MenuPageLayout>
  );
};

export default ProfileDetailScreen;
