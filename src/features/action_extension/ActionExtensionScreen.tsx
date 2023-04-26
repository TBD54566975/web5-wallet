import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import ActionExtension from "./ActionExtension";

export const ActionExtensionScreen = () => {
  const [requestValue, setRequestValue] = useState("");

  const onDismissTapped = () => {
    ActionExtension.dismiss();
  };

  useEffect(() => {
    const getWalletRequestFromExtension = async () => {
      try {
        const request = await ActionExtension.getWalletRequest();
        switch (request.kind) {
          case "PresentationDefinition":
            setRequestValue(JSON.stringify(request.value, null, 2));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getWalletRequestFromExtension();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{requestValue}</Text>
        <Pressable style={styles.button} onPress={onDismissTapped}>
          <Text style={styles.buttonText}>Dismiss</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
