import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ProfileManager } from "@/services/profile.service";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddProfileScreen = ({ navigation }) => {
  const [profileName, setProfileName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const addProfile = async () => {
    const newProfile: {
      name: string;
      icon: string;
      didMethod: "ion" | "key";
      displayName: string;
    } = {
      name: profileName,
      icon: "person-fill",
      didMethod: "ion",
      displayName: displayName,
    };
    await ProfileManager.createProfile(newProfile);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={Layouts.container}>
        <View style={Layouts.row}>
          <Text style={Typography.heading3}>Add a new profile</Text>
        </View>
        <View style={Layouts.row}>
          <Input
            onChangeText={setProfileName}
            value={profileName}
            placeholder={"My new profile"}
            nativeID="profileName"
            label="Add a profile name"
          />
        </View>
        <View style={Layouts.row}>
          <Input
            onChangeText={setDisplayName}
            value={profileName}
            placeholder={"My display name"}
            nativeID="displayName"
            label="Set your display name"
          />
        </View>
        <Button kind="primary" onPress={addProfile}>
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddProfileScreen;
