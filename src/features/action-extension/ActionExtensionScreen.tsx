import React, { useEffect, useState } from "react";
import { NativeModules, Pressable, SafeAreaView, Text } from "react-native";

export const ActionExtensionScreen = () => {
  const { dismiss, getData } = NativeModules.ActionExtension;
  const [message, setMessage] = useState("");

  const onDismissTapped = () => {
    dismiss();
  };

  useEffect(() => {
    const getDataFromExtension = async () => {
      try {
        const extensionMessage = await getData();
        setMessage(extensionMessage);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromExtension();
  }, []);

  return (
    <SafeAreaView>
      <Text>Provided message: {message}</Text>
      <Pressable onPress={onDismissTapped}>
        <Text>Dismiss</Text>
      </Pressable>
    </SafeAreaView>
  );
};
