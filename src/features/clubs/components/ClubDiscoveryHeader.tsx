import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

type ClubDiscoveryHeaderProps = {
  activeFilterLabel: string;
  filtersVisible: boolean;
  onToggleFilters: () => void;
};

export function ClubDiscoveryHeader({
  activeFilterLabel,
  filtersVisible,
  onToggleFilters,
}: ClubDiscoveryHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>Discover</Text>
          <Text style={styles.title}>Clubs</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onToggleFilters}
          style={[styles.filterButton, filtersVisible && styles.activeFilterButton]}
        >
          <Ionicons
            name="options"
            color={filtersVisible ? "#20B293" : theme.colors.textMuted}
            size={16}
          />
          <Text style={[styles.filterText, filtersVisible && styles.activeFilterText]}>
            {activeFilterLabel}
          </Text>
        </Pressable>
      </View>

      <View style={styles.contextRow}>
        <Ionicons name="location" color="#75847E" size={13} />
        <Text style={styles.contextText}>Eligible riding communities near you</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleBlock: {
    gap: 2,
  },
  eyebrow: {
    color: theme.colors.accent,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
  },
  filterButton: {
    alignItems: "center",
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    minHeight: 36,
    paddingHorizontal: 11,
  },
  activeFilterButton: {
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
  },
  filterText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "900",
  },
  activeFilterText: {
    color: "#20B293",
  },
  contextRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  contextText: {
    color: "#83918C",
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
  },
});
