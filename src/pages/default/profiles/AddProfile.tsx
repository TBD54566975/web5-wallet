import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layouts } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateIdentityList } from "@/features/identity/hooks";

type Props = AppNavigatorProps<"AddProfileScreen">;
const AddProfileScreen = ({ navigation }: Props) => {
  const [profileName, setProfileName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const queryClient = useQueryClient();

  const addProfile = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      await IdentityAgentManager.createIdentity(profileName, displayName);
      await invalidateIdentityList(queryClient);
      navigation.goBack();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
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
        {isProcessing ? (
          <ActivityIndicator />
        ) : (
          <Button kind="primary" onPress={addProfile} text="Save" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddProfileScreen;
