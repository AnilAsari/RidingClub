import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { StateMessage } from "@shared/components/StateMessage";
import { theme } from "@theme/index";

import { ProfileScreenHeader } from "../components/ProfileScreenHeader";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useProfile } from "../hooks/useProfile";
import { RiderBadge } from "../types";

export function BadgesScreen() {
  const profileQuery = useProfile();

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return <StateMessage title="Badges unavailable" message="We could not load your badges." />;
  }

  const badges = profileQuery.data.badges;
  const latestBadge = badges[badges.length - 1];

  return (
    <AppScreen contentStyle={styles.content}>
      <ProfileScreenHeader
        icon="ribbon-outline"
        title="Badges"
        subtitle="Milestones earned from ride logs, clubs, and riding consistency."
      />

      <View style={styles.summary}>
        <Text style={styles.summaryValue}>{badges.length}</Text>
        <View style={styles.summaryText}>
          <Text style={styles.summaryTitle}>Badges earned</Text>
          <Text style={styles.summaryMeta}>
            Latest: {latestBadge.name} · {formatDate(latestBadge.earnedAt)}
          </Text>
        </View>
      </View>

      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <BadgeTile key={badge.id} badge={badge} />
        ))}
      </View>
    </AppScreen>
  );
}

function BadgeTile({ badge }: { badge: RiderBadge }) {
  return (
    <View style={styles.badgeTile}>
      <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
        <Ionicons name={badge.icon as keyof typeof Ionicons.glyphMap} color="#FFFFFF" size={22} />
      </View>
      <Text style={styles.badgeName}>{badge.name}</Text>
      <Text style={styles.badgeDescription}>{badge.description}</Text>
      <Text style={styles.earnedAt}>{formatDate(badge.earnedAt)}</Text>
    </View>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
  },
  summary: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: "row",
    gap: 13,
    padding: 14,
  },
  summaryValue: {
    color: "#20B293",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
  },
  summaryText: {
    flex: 1,
    gap: 4,
  },
  summaryTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  summaryMeta: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 17,
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badgeTile: {
    alignItems: "center",
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 9,
    borderWidth: 1,
    gap: 8,
    minHeight: 174,
    padding: 12,
    width: "48.4%",
  },
  badgeIcon: {
    alignItems: "center",
    borderColor: "#080D0F",
    borderRadius: 18,
    borderWidth: 3,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  badgeName: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  badgeDescription: {
    color: theme.colors.textMuted,
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
    textAlign: "center",
  },
  earnedAt: {
    color: "#20B293",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
  },
});
