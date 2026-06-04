import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { navigationTheme, theme } from "../../theme";

type TabIconName = keyof typeof Ionicons.glyphMap;

const tabIcons: Record<string, TabIconName> = {
  index: "home",
  clubs: "people",
  rides: "speedometer",
  routes: "map",
  profile: "person",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        ...navigationTheme,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name] ?? "ellipse"} color={color} size={size} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="clubs" options={{ title: "Clubs" }} />
      <Tabs.Screen name="rides" options={{ title: "Rides" }} />
      <Tabs.Screen name="routes" options={{ title: "Routes" }} />
      <Tabs.Screen name="safety" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
