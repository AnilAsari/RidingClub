import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme";

type ScreenPlaceholderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function ScreenPlaceholder({
  title,
  eyebrow = "Rovera",
  description = "Screen shell for the initial navigation structure.",
}: ScreenPlaceholderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  eyebrow: {
    alignSelf: "flex-start",
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.colors.accentSoft,
    borderRadius: 6,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 10,
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
});
