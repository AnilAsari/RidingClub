import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { StateMessage } from "@shared/components/StateMessage";
import { theme } from "@theme/index";

import { ProfileRow } from "../components/ProfileRows";
import { ProfileScreenHeader } from "../components/ProfileScreenHeader";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useProfile } from "../hooks/useProfile";

export function SettingsScreen() {
  const profileQuery = useProfile();

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return <StateMessage title="Settings unavailable" message="We could not load settings." />;
  }

  return (
    <AppScreen contentStyle={styles.content}>
      <ProfileScreenHeader
        icon="settings-outline"
        title="Settings"
        subtitle="Control account, privacy, notifications, and ride preferences."
      />

      <SettingsGroup title="Account">
        <ProfileRow icon="call" label="Phone number" value="Verified mobile account" />
        <ProfileRow icon="shield-checkmark" label="Account security" value="OTP login enabled" />
      </SettingsGroup>

      <SettingsGroup title="Ride Preferences">
        <ProfileRow icon="notifications" label="Ride alerts" value="Club rides and route updates" />
        <ProfileRow icon="map" label="Map defaults" value="Avoid highways when possible" />
      </SettingsGroup>

      <SettingsGroup title="Privacy & Safety">
        <ProfileRow icon="eye" label="Profile visibility" value="Visible to clubs you can discover" />
        <ProfileRow icon="location" label="Live ride sharing" value="Only during active rides" />
        <ProfileRow icon="alert-circle" label="SOS contacts" value="Not configured" tone="warning" />
      </SettingsGroup>

      <SettingsGroup title="App">
        <ProfileRow icon="color-palette" label="Theme" value="Dark theme active" />
        <ProfileRow icon="language" label="Language" value="English" />
        <ProfileRow icon="log-out" label="Sign out" value="End this Rovera session" tone="muted" />
      </SettingsGroup>
    </AppScreen>
  );
}

function SettingsGroup({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.groupRows}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
  },
  group: {
    gap: 10,
  },
  groupTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  groupRows: {
    gap: 9,
  },
});
