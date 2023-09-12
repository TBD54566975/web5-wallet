import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";

type Props = AppNavigatorProps<"AddProfileScreen">;
const AddProfileScreen = ({ navigation }: Props) => {
  const [profileName, setProfileName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const addProfile = async () => {
    await IdentityAgentManager.createIdentity(profileName);
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
            value={displayName}
            placeholder={"My display name"}
            nativeID="displayName"
            label="Set your display name"
          />
        </View>
        <Button kind="primary" onPress={addProfile} text="Save" />
      </View>
    </SafeAreaView>
  );
};

export default AddProfileScreen;
