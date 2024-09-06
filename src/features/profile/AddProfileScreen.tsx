import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import { Button } from "../../components/Button";
import { queryClient } from "../app/queryclient";
import type { AppNavigatorProps } from "../../types/navigation";

type Props = AppNavigatorProps<"AddProfileScreen">;
export const AddProfileScreen = ({ navigation }: Props) => {
  const [profileName, setProfileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const addProfile = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      await IdentityAgentManager.createIdentity(profileName);
      await queryClient.invalidateQueries({ queryKey: ["identityList"] });
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
          label="Add a profile name"
          onChangeText={setProfileName}
          value={profileName}
          placeholder={"My new profile"}
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
