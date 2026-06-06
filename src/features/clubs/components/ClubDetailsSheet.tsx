import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { Club } from "../types";
import { getClubTypeLabel, getLastRideLabel, getNextRideLabel } from "./ClubCard";

type ClubDetailsSheetProps = {
  club: Club | null;
  visible: boolean;
  onClose: () => void;
};

export function ClubDetailsSheet({ club, visible, onClose }: ClubDetailsSheetProps) {
  if (!club) {
    return null;
  }

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.backdrop}>
        <Pressable accessibilityRole="button" onPress={onClose} style={styles.dismissArea} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.headerRow}>
                <View style={styles.clubIcon}>
                  <Ionicons name="bicycle" color="#20B293" size={22} />
                </View>
                <View style={styles.identity}>
                  <View style={styles.nameRow}>
                    <Text numberOfLines={1} style={styles.clubName}>
                      {club.name}
                    </Text>
                    {club.isVerified ? (
                      <Ionicons name="shield-checkmark" color="#20B293" size={17} />
                    ) : null}
                  </View>
                  <Text style={styles.metaText}>{getClubTypeLabel(club)}</Text>
                  <Text style={styles.location}>{club.location}</Text>
                </View>
                <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" color={theme.colors.text} size={18} />
                </Pressable>
              </View>

              <View style={styles.statusLine}>
                <Ionicons name={getStatusIcon(club)} color={getStatusColor(club)} size={15} />
                <Text style={[styles.statusText, { color: getStatusColor(club) }]}>
                  {getMembershipLabel(club)}
                </Text>
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.infoList}>
                <InfoLine icon="people" label={`${club.totalMembers.toLocaleString("en-IN")} riders`} />
                <InfoLine icon="flag" label={`${club.totalRidesHosted} rides hosted`} />
                <InfoLine icon="calendar" label={getRidePlanningLabel(club)} />
                <InfoLine icon="person-add" label={getJoinPolicyLabel(club)} />
              </View>

              <Section title="About">
                <Text style={styles.description}>{club.description}</Text>
              </Section>

              <Section title="Tags">
                <View style={styles.tags}>
                  {club.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </Section>

              <Section title="Planned Rides">
                {club.plannedRides.length > 0 ? (
                  <View style={styles.rideList}>
                    {club.plannedRides.map((ride) => (
                      <View key={ride.id} style={styles.rideRow}>
                        <View style={styles.rideDateBlock}>
                          <Ionicons name="calendar" color="#20B293" size={14} />
                        </View>
                        <View style={styles.rideDetails}>
                          <Text style={styles.rideTitle}>{ride.title}</Text>
                          <Text style={styles.rideMeta}>
                            {ride.dateLabel} - {ride.distanceKm} km
                          </Text>
                          <Text style={styles.rideStart}>{ride.startPoint}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No planned rides yet.</Text>
                )}
              </Section>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function InfoLine({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.infoLine}>
      <Ionicons name={icon} color="#75847E" size={15} />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function getRidePlanningLabel(club: Club) {
  if (club.upcomingRidesCount > 0) {
    return getNextRideLabel(club);
  }

  return `No upcoming rides - ${getLastRideLabel(club).replace("Last Ride", "last hosted ride")}`;
}

function getMembershipLabel(club: Club) {
  if (club.userMembershipStatus === "joined") {
    return "Member";
  }

  if (club.userMembershipStatus === "requested") {
    return "Request pending";
  }

  if (club.visibility === "restricted" || club.visibility === "private") {
    return "Approval required";
  }

  return "join instantly";
}

function getJoinPolicyLabel(club: Club) {
  if (club.userMembershipStatus === "requested") {
    return "Approval request already sent";
  }

  if (club.userMembershipStatus === "joined") {
    return "You can view and join this club's rides";
  }

  if (club.joinPolicy === "instant") {
    return "Instant join";
  }

  if (club.joinPolicy === "inviteOnly") {
    return "Invite only";
  }

  return "Approval required";
}

function getStatusIcon(club: Club): keyof typeof Ionicons.glyphMap {
  if (club.userMembershipStatus === "joined") {
    return "checkmark-circle";
  }

  if (club.userMembershipStatus === "requested") {
    return "time";
  }

  if (club.visibility === "restricted" || club.visibility === "private") {
    return "lock-closed";
  }

  return "radio-button-on";
}

function getStatusColor(club: Club) {
  if (club.userMembershipStatus === "joined") {
    return "#20B293";
  }

  if (
    club.userMembershipStatus === "requested" ||
    club.visibility === "restricted" ||
    club.visibility === "private"
  ) {
    return "#AAB4BE";
  }

  return "#F47632";
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    flex: 1,
    justifyContent: "flex-end",
  },
  dismissArea: {
    flex: 1,
  },
  sheet: {
    backgroundColor: "#071014",
    borderColor: "#263442",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 1,
    maxHeight: "84%",
    overflow: "hidden",
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#3A4742",
    borderRadius: 3,
    height: 4,
    marginBottom: 8,
    marginTop: 8,
    width: 42,
  },
  header: {
    borderBottomColor: "#1E2A33",
    borderBottomWidth: 1,
    gap: 12,
    padding: 16,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  clubIcon: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 11,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  identity: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  clubName: {
    color: theme.colors.text,
    flexShrink: 1,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
  },
  metaText: {
    color: "#20B293",
    fontSize: 12,
    fontWeight: "900",
  },
  location: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#17212B",
    borderColor: "#263442",
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  statusLine: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "900",
  },
  content: {
    gap: 18,
    padding: 16,
    paddingBottom: 28,
  },
  infoList: {
    gap: 9,
  },
  infoLine: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  infoText: {
    color: "#A4B0AB",
    fontSize: 13,
    fontWeight: "800",
  },
  section: {
    gap: 9,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  description: {
    color: "#A4B0AB",
    fontSize: 14,
    lineHeight: 21,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    alignItems: "center",
    backgroundColor: "#17212B",
    borderColor: "#263442",
    borderRadius: 5,
    borderWidth: 1,
    minHeight: 24,
    justifyContent: "center",
    paddingHorizontal: 9,
  },
  tagText: {
    color: "#94A29D",
    fontSize: 11,
    fontWeight: "800",
  },
  rideList: {
    gap: 10,
  },
  rideRow: {
    flexDirection: "row",
    gap: 10,
  },
  rideDateBlock: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderRadius: 8,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  rideDetails: {
    borderBottomColor: "#1E2A33",
    borderBottomWidth: 1,
    flex: 1,
    gap: 4,
    paddingBottom: 10,
  },
  rideTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  rideMeta: {
    color: "#A4B0AB",
    fontSize: 12,
    fontWeight: "800",
  },
  rideStart: {
    color: "#75847E",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
  },
});
