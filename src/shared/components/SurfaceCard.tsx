import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "@theme/index";

export function SurfaceCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
});
