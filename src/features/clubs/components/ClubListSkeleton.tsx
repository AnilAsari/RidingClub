import { StyleSheet, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { Skeleton } from "@shared/components/Skeleton";

const placeholderRows = ["club-skeleton-1", "club-skeleton-2", "club-skeleton-3", "club-skeleton-4"];

export function ClubListSkeleton() {
  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Skeleton height={12} width={72} />
          <Skeleton height={30} width={112} radius={7} />
        </View>
        <Skeleton height={36} width={94} radius={8} />
      </View>
      <Skeleton height={16} width="72%" />

      <View style={styles.list}>
        {placeholderRows.map((row) => (
          <View key={row} style={styles.row}>
            <Skeleton height={40} width={40} radius={9} />
            <View style={styles.rowBody}>
              <View style={styles.rowTop}>
                <View style={styles.rowText}>
                  <Skeleton height={16} width="76%" />
                  <Skeleton height={11} width="48%" />
                  <Skeleton height={11} width="58%" />
                </View>
                <Skeleton height={26} width={26} radius={13} />
              </View>
              <Skeleton height={12} width="88%" />
              <Skeleton height={12} width="72%" />
              <View style={styles.rowFooter}>
                <Skeleton height={23} width="48%" radius={5} />
                <Skeleton height={30} width={68} radius={6} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    gap: 8,
  },
  list: {
    gap: 14,
  },
  row: {
    alignItems: "flex-start",
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: "row",
    gap: 11,
    padding: 12,
  },
  rowBody: {
    flex: 1,
    gap: 7,
  },
  rowTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  rowText: {
    flex: 1,
    gap: 6,
  },
  rowFooter: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
});
