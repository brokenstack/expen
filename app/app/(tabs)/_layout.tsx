import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Providers } from "@/components/providers";
import { useSession } from "@/context/Authentication";
import AuthCheck from "@/components/AuthCheck";
import { Text, View } from "tamagui";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <AuthCheck />;
  }

  if (!session) {
    return <Redirect href="/(auth)/home" />;
  }

  return (
    <View width={"100%"} height={"100%"} bg={"black"} p={10}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: {
            height: 50,
            borderRadius: 20,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "stats-chart" : "stats-chart-outline"}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="split"
          options={{
            title: "Split",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "pie-chart" : "pie-chart-outline"}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
