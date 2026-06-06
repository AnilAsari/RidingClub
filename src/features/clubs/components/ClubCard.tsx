import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { Club } from "../types";

type ClubCardProps = {
  club: Club;
  onPress: (club: Club) => void;
};

export function ClubCard({ club, onPress }: ClubCardProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBadge}>
        <Ionicons name={getClubIcon(club)} color="#20B293" size={19} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={styles.nameBlock}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} style={styles.name}>
                {club.name}
              </Text>
              {club.isVerified ? (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" color="#071014" size={10} />
                </View>
              ) : null}
            </View>
            <Text numberOfLines={1} style={styles.clubType}>
              {getClubTypeLabel(club)}
            </Text>
            <Text numberOfLines={1} style={styles.location}>
              {club.location}
            </Text>
          </View>

          <Pressable
            accessibilityHint="Opens club details"
            accessibilityRole="button"
            onPress={() => onPress(club)}
            style={({ pressed }) => [styles.openCue, pressed && styles.openCuePressed]}
          >
            <Ionicons name="chevron-forward" color="#75847E" size={18} />
          </Pressable>
        </View>

        <Text numberOfLines={1} style={styles.metaLine}>
          {club.totalMembers.toLocaleString("en-IN")} {getMemberLabel(club)} ·{" "}
          {club.totalRidesHosted} rides hosted
        </Text>
        <Text numberOfLines={1} style={styles.metaLine}>
          {getUpcomingRideLabel(club)} · {getActivityLabel(club)}
        </Text>

        <View style={styles.footerRow}>
          <View style={[styles.accessBadge, getAccessBadgeStyle(club)]}>
            <Ionicons name={getAccessIcon(club)} color={getAccessColor(club)} size={11} />
            <Text style={[styles.accessText, { color: getAccessColor(club) }]}>
              {getCardAccessLabel(club)}
            </Text>
          </View>

          <View style={[styles.ctaPill, getCtaVariantStyle(club)]}>
            <Text style={[styles.ctaText, getCtaTextVariantStyle(club)]}>{getCtaLabel(club)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function getClubIcon(club: Club): keyof typeof Ionicons.glyphMap {
  if (club.clubType === "private") {
    return "people-circle";
  }

  if (club.clubType === "touring") {
    return "trail-sign";
  }

  return "bicycle";
}

function getMemberLabel(club: Club) {
  return club.clubType === "bikeModel" || club.clubType === "brand" ? "owners" : "riders";
}

function getUpcomingRideLabel(club: Club) {
  if (club.upcomingRidesCount === 0) {
    return "No upcoming rides";
  }

  return `${club.upcomingRidesCount} upcoming ${club.upcomingRidesCount === 1 ? "ride" : "rides"}`;
}

export function getNextRideLabel(club: Club) {
  if (club.upcomingRidesCount === 0 || !club.nextRideDate) {
    return "";
  }

  const days = getDaysFromToday(club.nextRideDate);

  if (days <= 0) {
    return "Next ride today";
  }

  return `Next ride in ${days} ${days === 1 ? "day" : "days"}`;
}

export function getLastRideLabel(club: Club) {
  if (!club.lastRideDate) {
    return "No hosted rides yet";
  }

  const days = getDaysFromToday(club.lastRideDate);
  const daysAgo = Math.abs(days);

  if (daysAgo === 0) {
    return "Last ride today";
  }

  return `Last ride ${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
}

function getActivityLabel(club: Club) {
  if (club.upcomingRidesCount > 0) {
    return getNextRideLabel(club);
  }

  return getLastRideLabel(club).replace("Last ride", "Last hosted ride");
}

export function getClubTypeLabel(club: Club) {
  if (club.isOfficialBrandClub && club.clubType === "brand") {
    return `Official ${club.restriction?.bikeMake ?? "Brand"} Club`;
  }

  if (club.clubType === "bikeModel") {
    return "Bike Model Community";
  }

  if (club.clubType === "touring") {
    return club.visibility === "private" ? "Private Touring Club" : "Public Touring Club";
  }

  if (club.clubType === "private") {
    return "Private Riding Group";
  }

  return "Public City Club";
}

export function getCtaLabel(club: Club) {
  if (club.userMembershipStatus === "joined") {
    return "Member";
  }

  if (club.userMembershipStatus === "requested") {
    return "Requested";
  }

  return "Join";
}

function getCardAccessLabel(club: Club) {
  if (club.userMembershipStatus === "joined") {
    return "Member";
  }

  if (club.userMembershipStatus === "requested") {
    return "Request pending";
  }

  if (club.joinPolicy === "instant") {
    return "Open to join";
  }

  return "Approval required";
}

function getAccessIcon(club: Club): keyof typeof Ionicons.glyphMap {
  if (club.userMembershipStatus === "joined") {
    return "checkmark-circle";
  }

  if (club.userMembershipStatus === "requested") {
    return "time";
  }

  if (club.joinPolicy === "instant") {
    return "radio-button-on";
  }

  return "lock-closed";
}

function getAccessColor(club: Club) {
  if (club.userMembershipStatus === "joined" || club.joinPolicy === "instant") {
    return "#20B293";
  }

  return "#AAB4BE";
}

function getAccessBadgeStyle(club: Club) {
  if (club.userMembershipStatus === "joined" || club.joinPolicy === "instant") {
    return styles.openAccessBadge;
  }

  return styles.grayAccessBadge;
}

function getCtaVariantStyle(club: Club) {
  if (club.userMembershipStatus === "joined") {
    return styles.joinedCtaPill;
  }

  if (club.userMembershipStatus === "requested") {
    return styles.requestedCtaPill;
  }

  return null;
}

function getCtaTextVariantStyle(club: Club) {
  if (club.userMembershipStatus === "joined" || club.userMembershipStatus === "requested") {
    return styles.secondaryCtaText;
  }

  return null;
}

function getDaysFromToday(dateValue: string) {
  const targetDate = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = targetDate.getTime() - today.getTime();
  return Math.round(diffMs / 86400000);
}

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: "row",
    gap: 11,
    padding: 12,
  },
  iconBadge: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 9,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  body: {
    flex: 1,
    gap: 7,
  },
  titleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  nameBlock: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  name: {
    color: theme.colors.text,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
  },
  verifiedBadge: {
    alignItems: "center",
    backgroundColor: "#20B293",
    borderRadius: 8,
    height: 16,
    justifyContent: "center",
    width: 16,
  },
  clubType: {
    color: "#20B293",
    fontSize: 11,
    fontWeight: "900",
  },
  location: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  openCue: {
    alignItems: "center",
    backgroundColor: "#17212B",
    borderColor: "#263442",
    borderRadius: 13,
    borderWidth: 1,
    height: 26,
    justifyContent: "center",
    width: 26,
  },
  openCuePressed: {
    backgroundColor: "#1D2A34",
    borderColor: "#3B4E5E",
  },
  metaLine: {
    color: "#A4B0AB",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 16,
  },
  footerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  accessBadge: {
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 5,
    minHeight: 23,
    paddingHorizontal: 7,
  },
  openAccessBadge: {
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
  },
  grayAccessBadge: {
    backgroundColor: "#1B2025",
    borderColor: "#343D46",
  },
  accessText: {
    flex: 1,
    fontSize: 10,
    fontWeight: "900",
    lineHeight: 12,
  },
  ctaPill: {
    alignItems: "center",
    backgroundColor: "#F47632",
    borderRadius: 6,
    justifyContent: "center",
    minHeight: 30,
    minWidth: 68,
    paddingHorizontal: 10,
  },
  ctaText: {
    color: "#080D0F",
    fontSize: 11,
    fontWeight: "900",
  },
  joinedCtaPill: {
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderWidth: 1,
  },
  requestedCtaPill: {
    backgroundColor: "#1B2025",
    borderColor: "#343D46",
    borderWidth: 1,
  },
  secondaryCtaText: {
    color: "#C5CED6",
  },
});
