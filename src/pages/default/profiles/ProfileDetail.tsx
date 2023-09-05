import { BadgeNames, ItemProps } from "@/components/Item";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Tappable } from "../Tappable";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID, formatDate } from "@/util/formatters";
import { MenuPageLayout } from "../MenuPageLayout";
import { mockConnections } from "@/services/mocks";

const ProfileDetailScreen = ({ navigation, route }) => {
  const tabLabels = ["About", "Connections", "Activity"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const navigateToReviewConnection = (connection) => {
    //TODO: update to `connectionSet`
    navigation.navigate("ReviewConnection", { connection });
  };

  const {
    name: profileName,
    displayName,
    icon,
    dateCreated,
    id,
  } = route.params.profile;

  //TODO: Sub this out for real connections
  const connections: ItemProps[] = mockConnections.map((connection) => {
    return {
      heading: connection.name,
      iconName: connection.icon as ItemProps["iconName"],
      badgeName: BadgeNames.CONNECTION,
    };
  });

  return (
    <MenuPageLayout
      headerItem={{
        heading: profileName,
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
          <LabelValueItem label="Profile label" value={profileName} />
          <LabelValueItem label="Public display name" value={displayName} />
          <LabelValueItem label="DID" value={formatDID(id)} />
          <LabelValueItem label="Created on" value={formatDate(dateCreated)} />
        </>
      )}
      {activeTab === tabLabels[1] && (
        <>
          <View style={Layouts.row}>
            <Text style={Typography.body4}>
              <Text style={Typography.body2}>{profileName}</Text> is connected
              to the following apps and services.
            </Text>
          </View>
          {connections?.map((connection, index) => (
            <Tappable
              key={index}
              options={connection}
              onPress={() => navigateToReviewConnection(connection)}
            />
          ))}
        </>
      )}
      {activeTab === tabLabels[2] && <></>}
    </MenuPageLayout>
  );
};

export default ProfileDetailScreen;