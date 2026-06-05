import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { RiderBadge } from "../types";

type BadgePreviewProps = {
  badges: RiderBadge[];
};

export function BadgePreview({ badges }: BadgePreviewProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Badges earned</Text>
      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.card}>
            <View style={[styles.medal, { borderColor: badge.color }]}>
              <Ionicons
                name={badge.icon as keyof typeof Ionicons.glyphMap}
                color={badge.color}
                size={25}
              />
            </View>
            <Text style={styles.name}>{badge.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 9,
  },
  sectionTitle: {
    color: "#6F7E78",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    alignItems: "center",
    width: "22.9%",
    minHeight: 78,
    backgroundColor: "#18221F",
    borderColor: "#2B3B36",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  medal: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    backgroundColor: "#0E1513",
    borderRadius: 7,
    borderTopWidth: 3,
    borderWidth: 1,
    marginBottom: 6,
  },
  name: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 12,
    textAlign: "center",
  },
});
