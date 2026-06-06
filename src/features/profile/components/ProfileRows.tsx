import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

type ProfileFieldProps = {
  label: string;
  value: string;
  helper?: string;
};

type ProfileRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  tone?: "default" | "muted" | "warning";
};

export function ProfileField({ helper, label, value }: ProfileFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

export function ProfileRow({ icon, label, tone = "default", value }: ProfileRowProps) {
  const isWarning = tone === "warning";
  const isMuted = tone === "muted";

  return (
    <View style={styles.row}>
      <View style={[styles.rowIcon, isWarning && styles.warningIcon, isMuted && styles.mutedIcon]}>
        <Ionicons name={icon} color={isWarning ? "#F4B15F" : "#20B293"} size={17} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" color="#75847E" size={17} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 13,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  value: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 19,
  },
  helper: {
    color: "#75847E",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
  },
  row: {
    alignItems: "center",
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 11,
    minHeight: 58,
    padding: 12,
  },
  rowIcon: {
    alignItems: "center",
    backgroundColor: "#12231F",
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  warningIcon: {
    backgroundColor: "#251F17",
  },
  mutedIcon: {
    backgroundColor: "#17212B",
  },
  rowText: {
    flex: 1,
    gap: 3,
  },
  rowLabel: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  rowValue: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
});
