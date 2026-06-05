import { StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { RiderBike } from "../types";

type GaragePreviewProps = {
  bikes: RiderBike[];
};

export function GaragePreview({ bikes }: GaragePreviewProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Garage</Text>
      {bikes.map((bike) => (
        <View key={bike.id} style={styles.card}>
          <View style={styles.bikeRow}>
            <View>
              <Text style={styles.nickname}>
                {bike.make} {bike.model}
              </Text>
              <Text style={styles.model}>
                {bike.year} · {bike.nickname} · {bike.engineCc} cc
              </Text>
            </View>
            <Text style={styles.distance}>{bike.loggedKm.toLocaleString("en-IN")} km</Text>
          </View>
        </View>
      ))}
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
  card: {
    backgroundColor: "#18221F",
    borderColor: "#2B3B36",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  bikeRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  nickname: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  model: {
    color: "#6F7E78",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  distance: {
    color: "#20B293",
    fontSize: 15,
    fontWeight: "900",
  },
});
