import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, type AvatarProps } from "../../../components/Avatar";
import { ItemBody, type ItemBodyProps } from "../../../components/Item";

export type ActivityProps = { images: AvatarProps[] } & ItemBodyProps;
export const Activity = (props: ActivityProps) => {
  const { images, heading, subtitle, body, headingSize } = props;

  return (
    <View>
      <View style={styles.row}>
        {images.map((imageProps, index) => (
          <Avatar
            key={index}
            source={imageProps.source}
            iconName={imageProps.iconName}
            badgeName={imageProps.badgeName}
          />
        ))}
      </View>
      <ItemBody
        heading={heading}
        subtitle={subtitle}
        body={body}
        headingSize={headingSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
