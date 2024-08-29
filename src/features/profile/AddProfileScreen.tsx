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
  const [dwnEndpoint, setDwnEndpoint] = useState("https://dwn.tbddev.org/beta");

  const addIdentityMutation = useAddIdentityMutation();

  const addProfile = () => {
    addIdentityMutation.mutate({ profileName, dwnEndpoint });
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
        <Input
          label="Dwn Endpoint"
          onChangeText={setDwnEndpoint}
          value={dwnEndpoint}
          placeholder={"https://dwn.tbddev.org/beta"}
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
