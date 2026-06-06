import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { RideAttendanceStatus, RideEvent, RideSkillLevel } from "../types";

type RideBoardProps = {
  featuredRide: RideEvent;
  getAttendanceStatus: (ride: RideEvent) => RideAttendanceStatus;
  laterRides: RideEvent[];
  onSelectRide: (ride: RideEvent) => void;
};

export function RideBoard({
  featuredRide,
  getAttendanceStatus,
  laterRides,
  onSelectRide,
}: RideBoardProps) {
  const rides = [featuredRide, ...laterRides];

  return (
    <View style={styles.list}>
      {rides.map((ride, index) => (
        <RideListRow
          attendanceStatus={getAttendanceStatus(ride)}
          isLast={index === rides.length - 1}
          key={ride.id}
          onPress={() => onSelectRide(ride)}
          ride={ride}
        />
      ))}
    </View>
  );
}

function RideListRow({
  attendanceStatus,
  isLast,
  onPress,
  ride,
}: {
  attendanceStatus: RideAttendanceStatus;
  isLast: boolean;
  onPress: () => void;
  ride: RideEvent;
}) {
  const startsAt = new Date(ride.startsAt);
  const isPending = attendanceStatus === "pending";

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <View style={styles.rail}>
        <View style={styles.dot} />
        {!isLast ? <View style={styles.line} /> : null}
      </View>

      <View style={styles.timeColumn}>
        <Text style={styles.time}>{formatTime(startsAt)}</Text>
        <Text style={styles.date}>{formatDate(startsAt)}</Text>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {ride.title}
        </Text>
        <Text numberOfLines={1} style={styles.club}>
          {ride.clubName}
        </Text>
        <Text numberOfLines={1} style={styles.meta}>
          {ride.meetingPoint} - {ride.distanceKm ?? "-"} km - {getSkillLabel(ride.skillLevel)}
        </Text>
        <Text style={styles.count}>{getListRsvpSummary(ride)}</Text>
      </View>

      <AttendanceCue status={attendanceStatus} />
    </Pressable>
  );
}

function AttendanceCue({ status }: { status: RideAttendanceStatus }) {
  if (status === "pending") {
    return (
      <View style={styles.pendingCue}>
        <Text style={styles.pendingCueText}>RSVP</Text>
        <Ionicons color="#F47632" name="chevron-forward" size={15} />
      </View>
    );
  }

  const isGoing = status === "going";

  return (
    <View style={styles.lockedCue}>
      <Ionicons
        color={isGoing ? "#20B293" : "#8C99A5"}
        name={isGoing ? "checkmark-circle" : "close-circle"}
        size={16}
      />
      <Text style={[styles.lockedCueText, isGoing && styles.goingCueText]}>
        {isGoing ? "Going" : "No"}
      </Text>
    </View>
  );
}

function formatTime(date: Date) {
  return date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(date: Date) {
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
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

function getListRsvpSummary(ride: RideEvent) {
  if (!ride.isCreatedByCurrentUser) {
    return `${ride.goingCount} going`;
  }

  const pendingCount = ride.invitedCount - ride.respondedCount;
  return `${ride.goingCount} going - ${ride.droppedCount} dropped - ${Math.max(pendingCount, 0)} pending`;
}

const styles = StyleSheet.create({
  list: {
    gap: 0,
  },
  row: {
    alignItems: "stretch",
    borderBottomColor: "#263442",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 104,
    paddingVertical: 14,
  },
  rail: {
    alignItems: "center",
    paddingTop: 4,
    width: 14,
  },
  dot: {
    backgroundColor: "#F47632",
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  line: {
    backgroundColor: "#263442",
    flex: 1,
    marginTop: 5,
    width: 1,
  },
  timeColumn: {
    width: 58,
  },
  time: {
    color: "#F7A06C",
    fontSize: 13,
    fontWeight: "900",
  },
  date: {
    color: "#8C99A5",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 3,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0,
  },
  club: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  meta: {
    color: "#AAB4BE",
    fontSize: 11,
    fontWeight: "800",
  },
  count: {
    color: "#7F8B96",
    fontSize: 11,
    fontWeight: "800",
  },
  pendingCue: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    gap: 2,
    minWidth: 50,
  },
  pendingCueText: {
    color: "#F47632",
    fontSize: 11,
    fontWeight: "900",
  },
  lockedCue: {
    alignItems: "center",
    alignSelf: "center",
    gap: 3,
    minWidth: 44,
  },
  lockedCueText: {
    color: "#AAB4BE",
    fontSize: 10,
    fontWeight: "900",
  },
  goingCueText: {
    color: "#20B293",
  },
});
