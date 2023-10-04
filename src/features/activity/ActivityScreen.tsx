import React from "react";
import { ParentPageLayout } from "@/components/ParentPageLayout";
import { ScrollView, View } from "react-native";
import { ItemStack } from "@/components/Item";
import { Layouts } from "@/theme/layouts";
import { mockActivity } from "@/features/activity/mocks";

const ActivityScreen = () => {
  return (
    <ParentPageLayout>
      <ScrollView>
        {mockActivity.map((activity, index) => {
          // TODO: do not key by index
          return (
            <View style={Layouts.row} key={index}>
              <ItemStack {...activity} />
            </View>
          );
        })}
      </ScrollView>
    </ParentPageLayout>
  );
};

export default ActivityScreen;
