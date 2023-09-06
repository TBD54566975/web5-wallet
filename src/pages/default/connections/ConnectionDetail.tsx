import React, { useState } from "react";
import { Text, View } from "react-native";
import { MenuPageLayout } from "../MenuPageLayout";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID } from "@/util/formatters";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Tappable } from "../Tappable";
import { BadgeNames, ItemProps } from "@/components/Item";
import { mockConnections } from "@/services/mocks";
import { userProfiles } from "@/features/identity/ProfileManager";

const ConnectionDetailScreen = ({ navigation, route }) => {
  const { heading: connectionName, iconName: icon } = route.params.connection;
  const tabLabels = ["About", "Connections", "Activity"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const navigateToReviewConnection = (connectionPair) => {
    navigation.navigate("ReviewConnection", { connectionPair });
  };

  //TODO: Sub this out for real connections
  const profiles: ItemProps[] = userProfiles.map((userProfile) => {
    const profile = userProfile.get();
    return {
      heading: profile.name,
      iconName: profile.icon as ItemProps["iconName"],
      badgeName: BadgeNames.PROFILE,
    };
  });

  const connection = mockConnections[0];

  return (
    <MenuPageLayout
      headerItem={{
        heading: connectionName,
        iconName: icon,
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
              <Text style={Typography.body2}>{connectionName}</Text> is
              connected to the following profiles.
            </Text>
          </View>
          {profiles?.map((profile, index) => (
            <Tappable
              key={index}
              options={profile}
              onPress={() =>
                navigateToReviewConnection({
                  connection,
                  profile,
                  dateCreated: "Thu Jan 1 2023",
                })
              }
            />
          ))}
        </>
      )}
      {activeTab === tabLabels[2] && <></>}
    </MenuPageLayout>
  );
};

export default ConnectionDetailScreen;
