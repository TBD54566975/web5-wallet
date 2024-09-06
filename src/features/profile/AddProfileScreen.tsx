import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { SPACE } from "../../theme/layouts";
import { Typography } from "../../theme/typography";
import { Button } from "../../components/Button";
import { useAddIdentityMutation } from "../identity/hooks";

export const AddProfileScreen = () => {
  const [profileName, setProfileName] = useState("");
  const addIdentityMutation = useAddIdentityMutation();

  const addProfile = () => {
    addIdentityMutation.mutate({ profileName });
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
        {addIdentityMutation.isPending ? (
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
