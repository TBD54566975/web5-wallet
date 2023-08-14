import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

type MaterialCommunityIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

const materialCommunity = (
  normalName: MaterialCommunityIconName,
  focusedName?: MaterialCommunityIconName
) => {
  const IconComponent = (props: TabBarIconProps) => {
    return (
      <MaterialCommunityIcons
        name={focusedName && props.focused ? focusedName : normalName}
        {...props}
      />
    );
  };

  IconComponent.displayName = `MaterialCommunityIcons(${normalName}, ${focusedName})`;

  return IconComponent;
};

type IonIconName = React.ComponentProps<typeof Ionicons>["name"];

const ionicons = (normalName: IonIconName, focusedName?: IonIconName) => {
  const IconComponent = (props: TabBarIconProps) => {
    return (
      <Ionicons
        name={focusedName && props.focused ? focusedName : normalName}
        {...props}
      />
    );
  };

  IconComponent.displayName = `Ionicons(${normalName}, ${focusedName})`;

  return IconComponent;
};

export const TabBarIcon = {
  materialCommunity,
  ionicons,
};
