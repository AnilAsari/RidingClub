import { StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { RiderStat } from "../types";

type ProfileStatsProps = {
  stats: RiderStat[];
};

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <View style={styles.card}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.stat}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#18221F",
    borderColor: "#253631",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  stat: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 12,
  },
  value: {
    color: "#20B293",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
  },
  label: {
    color: "#75847E",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 4,
    textTransform: "uppercase",
  },
});
