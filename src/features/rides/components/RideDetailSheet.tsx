import { PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { RideAttendanceStatus, RideEvent, RideSkillLevel } from "../types";

type RideDetailSheetProps = {
  attendanceStatus: RideAttendanceStatus;
  onChangeAttendanceStatus: (status: RideAttendanceStatus) => void;
  onClose: () => void;
  ride: RideEvent | null;
  visible: boolean;
};

export function RideDetailSheet({
  attendanceStatus,
  onChangeAttendanceStatus,
  onClose,
  ride,
  visible,
}: RideDetailSheetProps) {
  if (!ride) {
    return null;
  }

  const startsAt = new Date(ride.startsAt);

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.backdrop}>
        <Pressable accessibilityRole="button" onPress={onClose} style={styles.dismissArea} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateMonth}>{formatMonth(startsAt)}</Text>
                  <Text style={styles.dateDay}>{startsAt.getDate()}</Text>
                </View>
                <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
                  <Ionicons color="#B7C1CA" name="close" size={18} />
                </Pressable>
              </View>

              <View style={styles.headerCopy}>
                <Text style={styles.club}>{ride.clubName}</Text>
                <Text style={styles.title}>{ride.title}</Text>
                <View style={styles.organizerRow}>
                  <Ionicons color="#F7A06C" name="person-circle" size={15} />
                  <Text style={styles.organizer}>Organised by {ride.organizerName}</Text>
                </View>
              </View>
            </View>

            <View style={styles.keyFacts}>
              <Detail icon="time" label={formatDateTime(startsAt)} title="Start" />
              <Detail icon="location" label={ride.meetingPoint} title="Meeting" />
              <Detail icon="speedometer" label={`${ride.distanceKm ?? "-"} km`} title="Distance" />
              <Detail icon="stats-chart" label={getSkillLabel(ride.skillLevel)} title="Skill" />
            </View>

            <Section title="Route overview">
              <Text style={styles.bodyText}>{ride.routeSummary}</Text>
            </Section>

            <Section title="Description">
              <Text style={styles.bodyText}>{ride.description}</Text>
            </Section>

            <Section title="RSVP status">
              <StatLine label="Responded" value={`${ride.respondedCount}/${ride.invitedCount}`} />
              <StatLine label="Going" value={`${ride.goingCount}`} />
              <StatLine label="Dropped" value={`${ride.droppedCount}`} />
              <StatLine label="Not responded" value={`${getPendingCount(ride)}`} />
            </Section>

            <Section title="Stops">
              {ride.stops.map((stop) => (
                <Bullet key={stop} text={stop} />
              ))}
            </Section>

            <Section title="Mandatory riding gear">
              {ride.mandatoryGear.map((item) => (
                <Bullet key={item} text={item} />
              ))}
            </Section>

            <Section title="Optional items">
              {ride.optionalGear.map((item) => (
                <Bullet key={item} text={item} />
              ))}
            </Section>

            <View style={styles.footerStats}>
              <Text style={styles.footerText}>{ride.durationText ?? "Duration TBD"}</Text>
              <Text style={styles.footerText}>{ride.commentsCount} comments</Text>
            </View>
          </ScrollView>

          {attendanceStatus === "pending" ? (
            <View style={styles.actionBar}>
              <ResponseButton
                label="Not Going"
                onPress={() => onChangeAttendanceStatus("notGoing")}
              />
              <ResponseButton
                label="Going"
                onPress={() => onChangeAttendanceStatus("going")}
                primary
              />
            </View>
          ) : (
            <View style={styles.lockedBar}>
              <Ionicons
                color={attendanceStatus === "going" ? "#20B293" : "#AAB4BE"}
                name={attendanceStatus === "going" ? "checkmark-circle" : "close-circle"}
                size={18}
              />
              <View style={styles.lockedCopy}>
                <Text style={styles.lockedTitle}>{getLockedTitle(attendanceStatus)}</Text>
                <Text style={styles.lockedText}>
                  RSVP is locked until the ride creator resets your status.
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

function ResponseButton({
  label,
  onPress,
  primary,
}: {
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.responseButton,
        primary && styles.primaryResponseButton,
      ]}
    >
      <Text
        style={[
          styles.responseText,
          primary && styles.primaryResponseText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Detail({
  icon,
  label,
  title,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  title: string;
}) {
  return (
    <View style={styles.detail}>
      <Ionicons color="#F47632" name={icon} size={16} />
      <View style={styles.detailCopy}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text numberOfLines={2} style={styles.detailLabel}>
          {label}
        </Text>
      </View>
    </View>
  );
}

function Section({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bodyText}>{text}</Text>
    </View>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statLine}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function formatMonth(date: Date) {
  return date.toLocaleString("en-IN", { month: "short" }).toUpperCase();
}

function formatDateTime(date: Date) {
  return date.toLocaleString("en-IN", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getSkillLabel(skill: RideSkillLevel) {
  if (skill === "beginner") {
    return "Beginner";
  }

  if (skill === "advanced") {
    return "Advanced";
  }

  return "Intermediate";
}

function getPendingCount(ride: RideEvent) {
  return Math.max(ride.invitedCount - ride.respondedCount, 0);
}

function getLockedTitle(status: RideAttendanceStatus) {
  return status === "going" ? "You are going" : "You are not going";
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.62)",
    flex: 1,
    justifyContent: "flex-end",
  },
  dismissArea: {
    flex: 1,
  },
  sheet: {
    backgroundColor: "#0E171F",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "92%",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#3A4652",
    borderRadius: 2,
    height: 4,
    marginBottom: 18,
    width: 42,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  header: {
    gap: 14,
  },
  headerTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateBadge: {
    alignItems: "center",
    backgroundColor: "#F47632",
    borderRadius: 10,
    height: 78,
    justifyContent: "center",
    width: 68,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#17212B",
    borderColor: "#263442",
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  dateMonth: {
    color: "#080D0F",
    fontSize: 11,
    fontWeight: "900",
  },
  dateDay: {
    color: "#080D0F",
    fontSize: 29,
    fontWeight: "900",
    lineHeight: 33,
  },
  headerCopy: {
    gap: 6,
  },
  club: {
    color: "#F7A06C",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 33,
  },
  organizerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  organizer: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
  },
  actionBar: {
    backgroundColor: "#0E171F",
    borderTopColor: "#263442",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingBottom: 20,
    paddingTop: 14,
  },
  responseButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "#263442",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 46,
    justifyContent: "center",
  },
  primaryResponseButton: {
    backgroundColor: "#F47632",
    borderColor: "#F47632",
  },
  responseText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "900",
  },
  primaryResponseText: {
    color: "#080D0F",
  },
  lockedBar: {
    alignItems: "center",
    backgroundColor: "#0E171F",
    borderTopColor: "#263442",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingBottom: 20,
    paddingTop: 14,
  },
  lockedCopy: {
    flex: 1,
    gap: 2,
  },
  lockedTitle: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  lockedText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 16,
  },
  keyFacts: {
    borderBottomColor: "#263442",
    borderBottomWidth: 1,
    borderTopColor: "#263442",
    borderTopWidth: 1,
    gap: 0,
    marginTop: 20,
    paddingVertical: 4,
  },
  detail: {
    alignItems: "center",
    borderBottomColor: "#1F2B36",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 11,
    minHeight: 54,
    paddingVertical: 10,
  },
  detailCopy: {
    flex: 1,
    gap: 3,
  },
  detailTitle: {
    color: "#8C99A5",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  detailLabel: {
    color: "#D9E0E6",
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 18,
  },
  section: {
    gap: 8,
    marginTop: 20,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  bodyText: {
    color: "#B7C1CA",
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
  },
  bulletRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  bulletDot: {
    backgroundColor: "#F47632",
    borderRadius: 3,
    height: 6,
    marginTop: 7,
    width: 6,
  },
  statLine: {
    alignItems: "center",
    borderBottomColor: "#1F2B36",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 34,
  },
  statLabel: {
    color: "#B7C1CA",
    fontSize: 13,
    fontWeight: "700",
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  footerStats: {
    borderTopColor: "#263442",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    paddingTop: 14,
  },
  footerText: {
    color: "#F7A06C",
    fontSize: 12,
    fontWeight: "900",
  },
});
