import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { StateMessage } from "@shared/components/StateMessage";
import { theme } from "@theme/index";

import { RideBoard } from "../components/RideBoard";
import { RideDetailSheet } from "../components/RideDetailSheet";
import { RideFilter, RideFilterBar } from "../components/RideFilterBar";
import { RideListSkeleton } from "../components/RideListSkeleton";
import { useRideEvents } from "../hooks/useRideEvents";
import { RideAttendanceStatus, RideEvent } from "../types";

export function RidesScreen() {
  const rideEventsQuery = useRideEvents();
  const [activeFilter, setActiveFilter] = useState<RideFilter>("all");
  const [selectedRide, setSelectedRide] = useState<RideEvent | null>(null);
  const [attendanceOverrides, setAttendanceOverrides] = useState<Record<string, RideAttendanceStatus>>({});

  const filteredRides = useMemo(() => {
    const sortedRides = [...(rideEventsQuery.data ?? [])].sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );

    return sortedRides.filter((ride) => shouldShowRide(ride, activeFilter));
  }, [activeFilter, rideEventsQuery.data]);

  const featuredRide = filteredRides[0];
  const laterRides = filteredRides.slice(1);

  if (rideEventsQuery.isLoading) {
    return <RideListSkeleton />;
  }

  if (rideEventsQuery.isError || !rideEventsQuery.data) {
    return (
      <StateMessage
        title="Rides unavailable"
        message="We could not load upcoming rides right now. Please try again."
      />
    );
  }

  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Ride board</Text>
          <Text style={styles.title}>Upcoming rides</Text>
          <Text style={styles.subtitle}>Mark the rides you are going to. Every plan has full details.</Text>
        </View>
        <Pressable accessibilityRole="button" style={styles.createButton}>
          <Text style={styles.createButtonText}>Plan</Text>
        </Pressable>
      </View>

      <RideFilterBar activeFilter={activeFilter} onChange={setActiveFilter} />

      {featuredRide ? (
        <RideBoard
          featuredRide={featuredRide}
          getAttendanceStatus={(ride) => getAttendanceStatus(ride, attendanceOverrides)}
          laterRides={laterRides}
          onSelectRide={setSelectedRide}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No rides match this filter</Text>
          <Text style={styles.emptyText}>Try All or My clubs to see upcoming plans.</Text>
        </View>
      )}

      <RideDetailSheet
        attendanceStatus={selectedRide ? getAttendanceStatus(selectedRide, attendanceOverrides) : "notGoing"}
        onChangeAttendanceStatus={(status) => {
          if (!selectedRide) {
            return;
          }

          setAttendanceOverrides((current) => ({
            ...current,
            [selectedRide.id]: status,
          }));
        }}
        onClose={() => setSelectedRide(null)}
        ride={selectedRide}
        visible={Boolean(selectedRide)}
      />
    </AppScreen>
  );
}

function shouldShowRide(ride: RideEvent, activeFilter: RideFilter) {
  if (activeFilter === "all") {
    return true;
  }

  if (activeFilter === "my-clubs") {
    return ride.isFromJoinedClub;
  }

  const startsAt = new Date(ride.startsAt);

  if (activeFilter === "weekend") {
    return startsAt.getDay() === 0 || startsAt.getDay() === 6;
  }

  const today = new Date();
  return startsAt.getMonth() === today.getMonth() && startsAt.getFullYear() === today.getFullYear();
}

function getAttendanceStatus(
  ride: RideEvent,
  overrides: Record<string, RideAttendanceStatus>,
) {
  return overrides[ride.id] ?? ride.userAttendanceStatus;
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    color: "#F7A06C",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 34,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "#F47632",
    borderRadius: 7,
    height: 42,
    justifyContent: "center",
    minWidth: 64,
    paddingHorizontal: 14,
  },
  createButtonText: {
    color: "#080D0F",
    fontSize: 12,
    fontWeight: "900",
  },
  emptyState: {
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 16,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },
});
