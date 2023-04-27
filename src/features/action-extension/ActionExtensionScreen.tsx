import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { PresentationDefinitionComponent } from "./PresentationDefinitionComponent";
import ActionExtension from "./ActionExtension";
import { WalletRequest } from "./ActionExtensionTypes";

export const ActionExtensionScreen = () => {
  const [request, setRequest] = useState<WalletRequest>();

  useEffect(() => {
    const getWalletRequestFromExtension = async () => {
      try {
        setRequest(await ActionExtension.getWalletRequest());
      } catch (e) {
        console.error("Error getting wallet request: " + e);
      }
    };
    getWalletRequestFromExtension();
  }, []);

  const content = () => {
    switch (request?.kind) {
      case "PresentationDefinition":
        return <PresentationDefinitionComponent pd={request.value} />;
      case undefined:
        return <Text>Loading...</Text>;
    }
  };

  return content();
};

const styles = StyleSheet.create({
  pageContainer: {
    margin: 16,
  },
});
