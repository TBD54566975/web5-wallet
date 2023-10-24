import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { BadgeNames, Item, type ItemProps } from "@/components/Item";
import { mockConnections } from "@/features/connect/mocks";
import { ColorTheme } from "@/theme/colors";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import { formatDID } from "@/utils/formatters";

type Props = AppNavigatorProps<"AddCredentialOptionsScreen">;
const AddCredentialOptionsScreen = ({ navigation, route }: Props) => {
  const credential = route.params.credential;
  const [selectedProfile, setSelectedProfile] = useState(mockConnections[0]);

  const addCredential = () => {
    Alert.alert(
      "Not yet implemented",
      "Credentials not yet implemented. Nothing will be saved.",
      [
        {
          text: "OK, close and go back",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerColumn}>
            <Avatar
              iconName={credential.icon}
              badgeName={BadgeNames.CREDENTIAL}
            />
            <Text style={styles.headerCredentialName}>{credential.name}</Text>
            <Text style={styles.headerCredentialIssuer}>
              Issued by {credential.issuer}
            </Text>
          </View>
          <Text style={Typography.body4}>
            Select which of your profiles you’d like to add this credential to.
          </Text>
          {mockConnections.map((profile, index) => {
            // TODO: don't key by index
            return (
              <Pressable
                key={index}
                onPress={() => setSelectedProfile(profile)}
                accessibilityRole="radio"
              >
                <View style={styles.listItemRow}>
                  <View style={styles.iconAndTextRow}>
                    <Item
                      heading={profile.name}
                      subtitle={profile.description}
                      body={formatDID(profile.id)}
                      iconName={profile.icon as ItemProps["iconName"]}
                      badgeName={BadgeNames.PROFILE}
                    />
                  </View>
                  <View style={styles.radioRow}>
                    <View style={styles.radioOuter}>
                      {selectedProfile === profile && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
          <Button kind="primary" onPress={addCredential} text="Next" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACE.BASE,
    gap: SPACE.LARGE,
  },
  listItemRow: { flexDirection: "row" },
  headerColumn: { alignItems: "center" },
  headerCredentialName: { ...Typography.heading2, textAlign: "center" },
  headerCredentialIssuer: { ...Typography.body3, textAlign: "center" },
  iconAndTextRow: {
    flexBasis: "67%",
    flexDirection: "row",
  },
  radioRow: {
    flexBasis: "33%",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    padding: 2,
    borderWidth: 2,
    borderRadius: 999,
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    padding: 2,
    borderWidth: 2,
    borderRadius: 999,
    height: 12,
    width: 12,
    backgroundColor: ColorTheme.DEFAULT,
  },
});

export default AddCredentialOptionsScreen;
