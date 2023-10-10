import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SPACE } from "@/theme/layouts";
import { Typography } from "@/theme/typography";
import { AppNavigatorProps } from "@/types/navigation";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { invalidateIdentityList } from "@/features/identity/hooks";

type Props = AppNavigatorProps<"AddProfileScreen">;
const AddProfileScreen = ({ navigation }: Props) => {
  const [profileName, setProfileName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const addProfile = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      await IdentityAgentManager.createIdentity(profileName, displayName);
      await invalidateIdentityList();
      navigation.goBack();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={Typography.heading3}>Add a new profile</Text>
        <Input
          onChangeText={setProfileName}
          value={profileName}
          placeholder={"My new profile"}
          nativeID="profileName"
          label="Add a profile name"
        />
        <Input
          onChangeText={setDisplayName}
          value={displayName}
          placeholder={"My display name"}
          nativeID="displayName"
          label="Set your display name"
        />
        {isProcessing ? (
          <ActivityIndicator />
        ) : (
          <Button kind="primary" onPress={addProfile} text="Save" />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: SPACE.BASE, gap: SPACE.LARGE },
});

export default AddProfileScreen;
