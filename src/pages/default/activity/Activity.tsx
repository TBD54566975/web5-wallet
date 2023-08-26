import React from "react";
import { ParentPageLayout } from "@/pages/default/ParentPageLayout";
import { ScrollView, View } from "react-native";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";
import { ItemStackProps, ItemStack } from "@/components/Item";
import { Layouts } from "@/theme/layouts";

const ActivityScreen = () => {
  return (
    <ParentPageLayout>
      <ScrollView>
        <For each={profileActivityList}>
          {(profileActivityItem) => {
            const activityItem = profileActivityItem.get();
            if (!activityItem) {
              return <></>;
            }
            const options: ItemStackProps = activityItem;
            return (
              <View style={Layouts.row}>
                <ItemStack {...options} />
              </View>
            );
          }}
        </For>
      </ScrollView>
    </ParentPageLayout>
  );
};

export default ActivityScreen;

const mockProfileActivity: ItemStackProps[] = [
  {
    heading: "Social profile connected to DIDPay",
    body: "July 1, 2023",
    images: [
      {
        iconName: "hash",
        badgeName: "feed-person",
      },
      {
        iconName: "credit-card",
        badgeName: "webhook",
      },
    ],
  },
  {
    heading: "Anonymous profile created",
    body: "June 25, 2023",
    images: [
      {
        source: { uri: "https://reactnative.dev/img/tiny_logo.png" },
        badgeName: "feed-person",
      },
    ],
  },
  {
    heading: "Professional profile disconnected from Dignal",
    body: "June 20, 2023",
    images: [
      {
        iconName: "briefcase",
        badgeName: "feed-person",
      },
    ],
  },
];

const profileActivityList =
  observable<typeof mockProfileActivity>(mockProfileActivity);
