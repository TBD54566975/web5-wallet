import React, { useState } from "react";
import { Text, View } from "react-native";
import { MenuPageLayout } from "../MenuPageLayout";
import { LabelValueItem } from "@/components/LabelValue";
import { formatDID } from "@/util/formatters";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { Tappable } from "../Tappable";
import { BadgeNames } from "@/components/Item";
import { mockConnections } from "@/services/mocks";
import { profilesAtom } from "@/features/profile/atoms";
import { For } from "@legendapp/state/react";
import { AppNavigatorProps } from "@/types/navigation";

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
          <For each={profilesAtom}>
            {(profile) => {
              const profileData = profile.get();

              if (!profileData) {
                return <></>;
              }

              return (
                <Tappable
                  key={profileData.id}
                  heading={profileData.name}
                  iconName={profileData.icon}
                  badgeName={BadgeNames.PROFILE}
                  onPress={() => navigateToReviewConnection()}
                />
              );
            }}
          </For>
        </>
      )}
      {activeTab === tabLabels[2] && <></>}
    </MenuPageLayout>
  );
};

export default ConnectionDetailScreen;
