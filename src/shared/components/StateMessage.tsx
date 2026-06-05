import { StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

type StateMessageProps = {
  title: string;
  message: string;
};

export function StateMessage({ title, message }: StateMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
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
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  message: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
