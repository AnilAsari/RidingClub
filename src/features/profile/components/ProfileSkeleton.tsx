import { StyleSheet, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { Skeleton } from "@shared/components/Skeleton";

const garageRows = ["garage-skeleton-1", "garage-skeleton-2"];
const badgeRows = ["badge-skeleton-1", "badge-skeleton-2"];

export function ProfileSkeleton() {
  return (
    <AppScreen contentStyle={styles.screenContent}>
      <View style={styles.header}>
        <Skeleton height={180} radius={0} />
        <View style={styles.avatarRow}>
          <Skeleton height={86} width={86} radius={43} />
          <View style={styles.featuredBadges}>
            <Skeleton height={38} width={38} radius={19} />
            <Skeleton height={38} width={38} radius={19} />
            <Skeleton height={38} width={38} radius={19} />
          </View>
        </View>
        <View style={styles.identity}>
          <Skeleton height={24} width="58%" radius={6} />
          <Skeleton height={14} width="82%" radius={5} />
          <View style={styles.tags}>
            <Skeleton height={21} width={68} radius={4} />
            <Skeleton height={21} width={96} radius={4} />
            <Skeleton height={21} width={88} radius={4} />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.statsCard}>
          <Skeleton height={44} width="28%" radius={6} />
          <Skeleton height={44} width="28%" radius={6} />
          <Skeleton height={44} width="28%" radius={6} />
        </View>

        <View style={styles.section}>
          <Skeleton height={15} width={80} radius={4} />
          {garageRows.map((row) => (
            <View key={row} style={styles.listRow}>
              <View style={styles.listText}>
                <Skeleton height={18} width="62%" radius={5} />
                <Skeleton height={13} width="45%" radius={5} />
              </View>
              <Skeleton height={18} width={74} radius={5} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Skeleton height={15} width={120} radius={4} />
          <View style={styles.badgeGrid}>
            {badgeRows.flatMap((row) =>
              [0, 1, 2, 3].map((item) => (
                <View key={`${row}-${item}`} style={styles.badgeTile}>
                  <Skeleton height={28} width={28} radius={8} />
                  <Skeleton height={12} width="72%" radius={4} />
                </View>
              )),
            )}
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    gap: 0,
    padding: 0,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: "#080D0F",
  },
  avatarRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -40,
    paddingHorizontal: 20,
  },
  featuredBadges: {
    flexDirection: "row",
    gap: 7,
    paddingBottom: 20,
  },
  identity: {
    gap: 10,
    marginTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  body: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  statsCard: {
    alignItems: "center",
    backgroundColor: "#18221F",
    borderColor: "#253631",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  section: {
    gap: 12,
  },
  listRow: {
    alignItems: "center",
    backgroundColor: "#18221F",
    borderColor: "#253631",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 14,
  },
  listText: {
    flex: 1,
    gap: 8,
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badgeTile: {
    alignItems: "center",
    backgroundColor: "#18221F",
    borderColor: "#253631",
    borderRadius: 8,
    borderWidth: 1,
    gap: 9,
    justifyContent: "center",
    minHeight: 88,
    width: "22.7%",
  },
});
