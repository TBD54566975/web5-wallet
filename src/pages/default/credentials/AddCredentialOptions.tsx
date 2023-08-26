import { Button } from "@/components/Button";
import { Item, ItemAvatar } from "@/components/Item";
import { ColorTheme } from "@/theme/colors";
import { FlexLayouts, Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

const AddCredentialOptionsScreen = ({ navigation }) => {
  const profiles = ["My social profile", "My professional profile"];
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
            iconName="note"
            badgeName="id-badge"
            style={Typography.textCenter}
          />
          <Text style={[Typography.heading2, Typography.textCenter]}>
            US Passport
          </Text>
          <Text style={[Typography.body3, Typography.textCenter]}>
            Issued by U.S. State Department
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
              <View style={style.row}>
                <View style={[FlexLayouts.row, style.textContainer]}>
                  <Item
                    heading={profile}
                    subtitle="Alex Aardvark"
                    body="did:ion:123...890"
                    iconName="hash"
                    badgeName="feed-person"
                  />
                </View>
                <View style={style.buttonContainer}>
                  <View style={style.radioOuter}>
                    {selectedProfile === profile && (
                      <View style={style.radioInner} />
                    )}
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
        <Button kind="primary" onPress={addCredential}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddCredentialOptionsScreen;

const style = StyleSheet.create({
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
