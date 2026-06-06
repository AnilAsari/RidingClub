import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SectionHeader } from "@shared/components/SectionHeader";
import { SurfaceCard } from "@shared/components/SurfaceCard";
import { theme } from "@theme/index";

type ActionItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const actions: ActionItem[] = [
  { label: "Edit profile", icon: "create-outline", route: "/profile/edit" },
  { label: "Garage", icon: "construct-outline", route: "/profile/garage" },
  { label: "Badges", icon: "ribbon-outline", route: "/profile/badges" },
  { label: "Settings", icon: "settings-outline", route: "/profile/settings" },
];

export function ProfileActions() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Account" />
      <SurfaceCard>
        {actions.map((action, index) => (
          <Pressable
            key={action.route}
            onPress={() => router.push(action.route)}
            style={[styles.action, index < actions.length - 1 && styles.withBorder]}
          >
            <View style={styles.actionLabel}>
              <Ionicons name={action.icon} color={theme.colors.accent} size={20} />
              <Text style={styles.label}>{action.label}</Text>
            </View>
            <Ionicons name="chevron-forward" color={theme.colors.textMuted} size={18} />
          </Pressable>
        ))}
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  action: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 40,
  },
  withBorder: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  actionLabel: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  label: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
});
