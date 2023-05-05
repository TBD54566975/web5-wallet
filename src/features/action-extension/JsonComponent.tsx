import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const JsonComponent = ({ jsonObject }) => {
  const renderJson = (obj, level = 0) => {
    // Sort non-objects to the top of the list
    const sortedKeys = Object.keys(obj).sort((a, b) => {
      const aValueIsObject = typeof obj[a] === "object" && obj[a] !== null;
      const bValueIsObject = typeof obj[b] === "object" && obj[b] !== null;

      if (aValueIsObject === bValueIsObject) {
        return a.localeCompare(b);
      }

      return aValueIsObject ? 1 : -1;
    });

    return sortedKeys.map((key) => {
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        return (
          <View key={key} style={[styles.jsonContainer]}>
            <Text style={styles.jsonKey}>{key}:</Text>
            {renderJson(value, level + 1)}
          </View>
        );
      } else {
        return (
          <View key={key} style={styles.row}>
            <Text style={styles.jsonKey}>{key}:</Text>
            <Text style={styles.jsonValue}>{JSON.stringify(value)}</Text>
          </View>
        );
      }
    });
  };

  return <View style={styles.jsonContainer}>{renderJson(jsonObject)}</View>;
};

const styles = StyleSheet.create({
  jsonContainer: {
    backgroundColor: "rgba(255, 255, 0, 0.05)",
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  jsonKey: {
    fontWeight: "bold",
    marginRight: 5,
  },
  jsonValue: {
    fontStyle: "italic",
  },
});
