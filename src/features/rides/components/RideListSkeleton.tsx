import { StyleSheet, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { Skeleton } from "@shared/components/Skeleton";

export function RideListSkeleton() {
  return (
    <AppScreen contentStyle={styles.content}>
      <Skeleton height={30} width="54%" />
      <Skeleton height={124} radius={8} />
      <Skeleton height={42} radius={8} />
      <View style={styles.timeline}>
        <Skeleton height={84} radius={6} />
        <Skeleton height={84} radius={6} />
        <Skeleton height={84} radius={6} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
  },
  timeline: {
    gap: 12,
  },
});
