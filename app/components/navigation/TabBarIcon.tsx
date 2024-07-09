// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, XStack, YStack } from "tamagui";
import { ComponentProps } from "react";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface TabBarIconProps
  extends IconProps<ComponentProps<typeof Ionicons>["name"]> {
  focused: boolean;
}

export function TabBarIcon({ style, focused, ...rest }: TabBarIconProps) {
  return (
    <Ionicons
      size={focused ? 25 : 23}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}
