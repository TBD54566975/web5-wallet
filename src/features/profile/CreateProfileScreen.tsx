import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import ProfileApi from "./ProfileApi";

export const CreateProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");

  const onPressCreateProfile = async () => {
    ProfileApi.createProfile({ name: name, didMethod: "ion" });

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.pageContainer}>
        <Text variant="titleMedium">
          Welcome to wallet. To continue, please create a profile.
        </Text>
        <TextInput
          value={name}
          label="Username"
          onChangeText={setName}
          mode="outlined"
        />
        <Button mode="contained" onPress={onPressCreateProfile}>
          Create Profile
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, padding: 16, gap: 16 },
});
