import React from "react";
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import { Item } from "../../components/Item";
import { LabelValueItem } from "../../components/LabelValue";
import { ColorTheme } from "../../theme/colors";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { formatDID, formatDate } from "../../utils/formatters";
import { Button } from "../../components/Button";

export const ReviewConnectionScreen = () => {
  const { connection, profile } = {
    connection: {
      name: "Dignal",
      icon: "comment-discussion" as const,
    },
    profile: {
      name: "Social profile",
      icon: "hash" as const,
      id: "did:ion:123456789012345678901234567890",
    },
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Item
              heading={profile.name}
              body={formatDID(profile.id)}
              iconName={profile.icon}
              badgeName={"feed-person"}
              headingSize="heading4"
            />
            <Item
              heading={connection.name}
              iconName={connection.icon}
              badgeName={"webhook"}
              headingSize="heading4"
            />
          </View>
          <View style={styles.row}>
            <Text style={Typography.body4}>
              {connection.name} is connected to Professional profile and has
              access to certain info.
            </Text>
          </View>
          <View>
            <LabelValueItem
              label="Connection made"
              value={formatDate(new Date().toString())}
            />
          </View>
          <View style={styles.column}>
            <Text style={Typography.body2}>{connection.name} can</Text>
            <Text style={Typography.body4}>
              &bull; see and edit your profile info
            </Text>
            <Text style={Typography.body4}>
              &bull; see and edit your contacts
            </Text>
            <Text style={Typography.body4}>&bull; see and edit your chats</Text>
          </View>
          <View style={styles.column}>
            <Button
              kind="destructive"
              text={`Disconnect ${connection.name} from ${profile.name}`}
            />
            <Text style={styles.disclaimerText}>
              Disconnecting may take up to 24 hours
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    padding: SPACE.BASE,
    gap: SPACE.MEDIUM,
  },
  column: { gap: SPACE.XSMALL },
  row: { gap: SPACE.SMALL },
  disclaimerText: {
    ...Typography.label3,
    textAlign: "center",
    color: ColorTheme.REDUCED,
  },
});
