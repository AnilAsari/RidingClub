import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

export type RideFilter = "all" | "my-clubs" | "weekend" | "month";

const filters: Array<{ label: string; value: RideFilter }> = [
  { label: "All", value: "all" },
  { label: "My clubs", value: "my-clubs" },
  { label: "Weekend", value: "weekend" },
  { label: "Month", value: "month" },
];

type RideFilterBarProps = {
  activeFilter: RideFilter;
  onChange: (filter: RideFilter) => void;
};

export function RideFilterBar({ activeFilter, onChange }: RideFilterBarProps) {
  return (
    <View style={styles.segmentedControl}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <Pressable
            accessibilityRole="button"
            key={filter.value}
            onPress={() => onChange(filter.value)}
            style={[styles.segment, isActive && styles.activeSegment]}
          >
            <Text style={[styles.segmentText, isActive && styles.activeSegmentText]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentedControl: {
    backgroundColor: "#0E171F",
    borderColor: "#263442",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    padding: 3,
  },
  segment: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  activeSegment: {
    backgroundColor: "#F47632",
  },
  segmentText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
  },
  activeSegmentText: {
    color: "#080D0F",
  },
});
