import React, { useState } from "react";
import { Text, View } from "react-native";
import { MenuPageLayout } from "../MenuPageLayout";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID } from "@/util/formatters";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Tappable } from "../Tappable";
import { ItemProps } from "@/components/Item";

const ConnectionDetailScreen = ({ navigation, route }) => {
  const tabLabels = ["About", "Connections", "Activity"];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const navigateToReviewConnection = (connection) => {
    //TODO: update to `connectionSet`
    navigation.navigate("ReviewConnection", { connection });
  };

  const { heading: connectionName, iconName: icon } = route.params.connection;

  //TODO: Sub this out for real connections
  const profiles: ItemProps[] = [
    {
      heading: "My social profile",
      iconName: "hash",
      badgeName: "feed-person",
    },
  ];

  const id = "did:ion:1234567890123456789012345678901234567890";
  const developer = "Block Inc.";
  const description =
    "A simple messaging app, inspired by Signal and built on Web5 principles.";

  return (
    <MenuPageLayout
      headerItem={{
        heading: connectionName,
        iconName: icon,
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
      {activeTab === tabLabels[0] && (
        <>
          <LabelValueItem label="DID" value={formatDID(id)} />
          <LabelValueItem label="Developer" value={developer} />
          <LabelValueItem label="Description" value={description} />
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
              onPress={() => navigateToReviewConnection(profile)}
            />
          ))}
        </>
      )}
      {activeTab === tabLabels[2] && <></>}
    </MenuPageLayout>
  );
};

export default ConnectionDetailScreen;
