import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { StateMessage } from "@shared/components/StateMessage";
import { theme } from "@theme/index";

import { ProfileScreenHeader } from "../components/ProfileScreenHeader";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useProfile } from "../hooks/useProfile";
import { RiderBike } from "../types";

export function GarageManagementScreen() {
  const profileQuery = useProfile();

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return <StateMessage title="Garage unavailable" message="We could not load your garage." />;
  }

  const bikes = profileQuery.data.garage;

  return (
    <AppScreen contentStyle={styles.content}>
      <ProfileScreenHeader
        icon="construct-outline"
        title="Garage"
        subtitle="Manage bikes that unlock brand clubs, model communities, and ride eligibility."
      />

      <View style={styles.notice}>
        <Ionicons name="information-circle" color="#20B293" size={18} />
        <Text style={styles.noticeText}>
          Your garage decides which brand and model-specific clubs appear in discovery.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Bikes</Text>
          <View style={styles.addButton}>
            <Ionicons name="add" color="#080D0F" size={15} />
            <Text style={styles.addText}>Add Bike</Text>
          </View>
        </View>

        {bikes.map((bike, index) => (
          <BikeCard key={bike.id} bike={bike} isPrimary={index === 0} />
        ))}
      </View>
    </AppScreen>
  );
}

function BikeCard({ bike, isPrimary }: { bike: RiderBike; isPrimary: boolean }) {
  return (
    <View style={styles.bikeCard}>
      <View style={styles.bikeTopRow}>
        <View style={styles.bikeIcon}>
          <Ionicons name="bicycle" color="#20B293" size={21} />
        </View>
        <View style={styles.bikeTitleBlock}>
          <View style={styles.bikeNameRow}>
            <Text style={styles.bikeName}>
              {bike.make} {bike.model}
            </Text>
            {isPrimary ? <Text style={styles.primaryTag}>Primary</Text> : null}
          </View>
          <Text style={styles.bikeMeta}>
            {bike.year} · {bike.nickname} · {bike.engineCc} cc
          </Text>
        </View>
      </View>

      <View style={styles.bikeFooter}>
        <Text style={styles.kmValue}>{bike.loggedKm.toLocaleString("en-IN")} km</Text>
        <Text style={styles.kmLabel}>Logged on Rovera</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
  },
  notice: {
    alignItems: "flex-start",
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 9,
    padding: 12,
  },
  noticeText: {
    color: "#A4B0AB",
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#F47632",
    borderRadius: 7,
    flexDirection: "row",
    gap: 5,
    minHeight: 30,
    paddingHorizontal: 10,
  },
  addText: {
    color: "#080D0F",
    fontSize: 11,
    fontWeight: "900",
  },
  bikeCard: {
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 9,
    borderWidth: 1,
    gap: 14,
    padding: 14,
  },
  bikeTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  bikeIcon: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 10,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  bikeTitleBlock: {
    flex: 1,
    gap: 5,
  },
  bikeNameRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  bikeName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  primaryTag: {
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 4,
    borderWidth: 1,
    color: "#20B293",
    fontSize: 10,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  bikeMeta: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  bikeFooter: {
    borderTopColor: "#263442",
    borderTopWidth: 1,
    gap: 3,
    paddingTop: 12,
  },
  kmValue: {
    color: "#20B293",
    fontSize: 17,
    fontWeight: "900",
  },
  kmLabel: {
    color: "#75847E",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
