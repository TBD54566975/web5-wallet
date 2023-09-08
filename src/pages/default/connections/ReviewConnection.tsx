import { Button } from "@/components/Button";
import { BadgeNames, Item } from "@/components/Item";
import { LabelValueItem } from "@/components/LabelValue";
import { ColorTheme } from "@/theme/colors";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { formatDID, formatDate } from "@/util/formatters";
import React from "react";
import { View, SafeAreaView, Text } from "react-native";

const ReviewConnectionScreen = () => {
  const { connection, profile } = {
    connection: {
      name: "Dignal",
      icon: "comment-discussion" as const,
    },
    profile: {
      name: "Social profile",
      displayName: "Alex Aardvark",
      icon: "hash" as const,
      id: "did:ion:123456789012345678901234567890",
    },
  };

  return (
    <SafeAreaView>
      <View style={Layouts.container}>
        <View style={Layouts.row}>
          <Item
            heading={profile.name}
            subtitle={profile.displayName}
            body={formatDID(profile.id)}
            iconName={profile.icon}
            badgeName={BadgeNames.PROFILE}
            headingSize="heading3"
          />
          <Item
            heading={connection.name}
            iconName={connection.icon}
            badgeName={BadgeNames.CONNECTION}
            headingSize="heading3"
          />
        </View>
        <View style={Layouts.row}>
          <Text style={Typography.body4}>
            <Text style={Typography.body2}>{connection.name}</Text> is connected
            to Professional profile and has access to certain info.
          </Text>
        </View>
        <View>
          <LabelValueItem
            label="Connection made"
            value={formatDate(new Date().toString())}
          />
        </View>
        <View style={Layouts.row}>
          <Text style={Typography.body4}>
            <Text style={Typography.body2}>{connection.name}</Text> can
          </Text>
          <Text style={Typography.body4}>
            &bull; see and edit your profile info
          </Text>
          <Text style={Typography.body4}>
            &bull; see and edit your contacts
          </Text>
          <Text style={Typography.body4}>&bull; see and edit your chats</Text>
        </View>
        <View style={FlexLayouts.column}>
          <Button kind="destructive">
            Disconnect <Text style={Typography.body2}>{connection.name}</Text>{" "}
            from <Text style={Typography.body2}>{profile.name}</Text>
          </Button>
          <Text
            style={[
              Typography.label3,
              Typography.textCenter,
              { color: ColorTheme.REDUCED },
            ]}
          >
            Disconnecting may take up to 24 hours
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReviewConnectionScreen;
