import React from "react";
import { Avatar, Card, Text } from "react-native-paper";
import type { PrettyCredential } from "../../types/models";

export const CredentialCard = ({ type, date, issuer }: PrettyCredential) => {
  return (
    <Card>
      <Card.Content>
        <Avatar.Icon icon="note-text-outline" />
        <Text variant="titleLarge">{type}</Text>
        <Text variant="titleMedium">{issuer}</Text>
        <Text variant="bodyMedium">{date}</Text>
      </Card.Content>
    </Card>
  );
};
