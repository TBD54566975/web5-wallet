import { Button } from "@/components/Button";
import { BadgeNames, Item, ItemAvatar, ItemProps } from "@/components/Item";
import { profilesAtom } from "@/features/profile/atoms";
import { ColorTheme } from "@/theme/colors";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import { formatDID } from "@/util/formatters";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

type Props = AppNavigatorProps<"AddCredentialOptionsScreen">;
const AddCredentialOptionsScreen = ({ navigation, route }: Props) => {
  const credential = route.params.credential;
  const profiles = profilesAtom.map((userProfile) => userProfile.get());
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

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
      <View style={Layouts.container}>
        <View style={[Layouts.row, FlexLayouts.containerHorizontalCenter]}>
          <ItemAvatar
            iconName={credential.icon}
            badgeName={BadgeNames.CREDENTIAL}
          />
          <Text style={[Typography.heading2, Typography.textCenter]}>
            {credential.name}
          </Text>
          <Text style={[Typography.body3, Typography.textCenter]}>
            Issued by {credential.issuer}
          </Text>
        </View>
        <View style={Layouts.row}>
          <Text style={Typography.body4}>
            Select which of your profiles you’d like to add this credential to.
          </Text>
        </View>

        {profiles.map((profile, index) => {
          return (
            <Pressable
              style={Layouts.row}
              key={index}
              onPress={() => setSelectedProfile(profile)}
              accessibilityRole="radio"
            >
              <View style={Selections.row}>
                <View style={[FlexLayouts.row, Selections.textContainer]}>
                  <Item
                    heading={profile.name}
                    subtitle={profile.displayName}
                    body={formatDID(profile.id)}
                    iconName={profile.icon as ItemProps["iconName"]}
                    badgeName={BadgeNames.PROFILE}
                  />
                </View>
                <View style={Selections.buttonContainer}>
                  <View style={Selections.radioOuter}>
                    {selectedProfile === profile && (
                      <View style={Selections.radioInner} />
                    )}
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
        <Button kind="primary" onPress={addCredential} text="Next" />
      </View>
    </SafeAreaView>
  );
};

export default AddCredentialOptionsScreen;

const Selections = StyleSheet.create({
  //TODO: this is a shared style with Item/Tappable styles
  row: {
    flexDirection: "row",
    // alignContent: "flex-start",
  },
  textContainer: {
    flexBasis: "67%",
    flexDirection: "row",
  },
  buttonContainer: {
    flexBasis: "33%",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-start",
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
