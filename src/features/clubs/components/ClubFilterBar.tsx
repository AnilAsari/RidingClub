import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { ClubType } from "../types";

export type ClubFilter = "all" | "my-clubs" | ClubType;

type ClubFilterOption = {
  label: string;
  value: ClubFilter;
};

const filters: ClubFilterOption[] = [
  { label: "All", value: "all" },
  { label: "My Clubs", value: "my-clubs" },
  { label: "City", value: "city" },
  { label: "Bike", value: "bikeModel" },
  { label: "Touring", value: "touring" },
  { label: "Verified", value: "verified" },
];

export function getClubFilterLabel(value: ClubFilter) {
  return filters.find((filter) => filter.value === value)?.label ?? "All";
}

type ClubFilterBarProps = {
  activeFilter: ClubFilter;
  onChange: (filter: ClubFilter) => void;
};

export function ClubFilterBar({ activeFilter, onChange }: ClubFilterBarProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <Pressable
              key={filter.value}
              onPress={() => onChange(filter.value)}
              style={styles.tab}
            >
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                {filter.label}
              </Text>
              <View style={[styles.indicator, isActive && styles.activeIndicator]} />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 18,
    paddingRight: 8,
  },
  tab: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 2,
  },
  chipText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  activeChipText: {
    color: "#20B293",
  },
  indicator: {
    backgroundColor: "transparent",
    borderRadius: 2,
    height: 2,
    width: 18,
  },
  activeIndicator: {
    backgroundColor: "#20B293",
  },
});
