import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

type ProfileScreenHeaderProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};

export function ProfileScreenHeader({ icon, title, subtitle }: ProfileScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.iconBadge}>
        <Ionicons name={icon} color="#20B293" size={22} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  iconBadge: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 11,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  textBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});
