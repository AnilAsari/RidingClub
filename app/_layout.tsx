import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProviders } from "../components/providers/AppProviders";
import { navigationTheme, theme } from "../theme";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style={theme.statusBarStyle} />
      <Stack
        screenOptions={navigationTheme}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="clubs/[clubId]" options={{ title: "Club Detail" }} />
        <Stack.Screen name="clubs/[clubId]/members" options={{ title: "Club Members" }} />
        <Stack.Screen name="events/create" options={{ title: "Create Ride" }} />
        <Stack.Screen name="events/[eventId]" options={{ title: "Ride Event" }} />
        <Stack.Screen name="events/live/[eventId]" options={{ title: "Live Group Ride" }} />
        <Stack.Screen name="events/my-events" options={{ title: "My Events" }} />
        <Stack.Screen name="rides/active" options={{ title: "Active Ride" }} />
        <Stack.Screen name="rides/history" options={{ title: "Ride History" }} />
        <Stack.Screen name="rides/summary" options={{ title: "Ride Summary" }} />
        <Stack.Screen name="rides/[rideId]" options={{ title: "Ride Detail" }} />
        <Stack.Screen name="routes/planner" options={{ title: "Route Planner" }} />
        <Stack.Screen name="routes/offline-packs" options={{ title: "Offline Map Packs" }} />
        <Stack.Screen name="routes/[routeId]" options={{ title: "Route Detail" }} />
        <Stack.Screen name="safety/hazards" options={{ title: "Hazard Map" }} />
        <Stack.Screen name="safety/report-hazard" options={{ title: "Report Hazard" }} />
        <Stack.Screen name="safety/sos-setup" options={{ title: "SOS Setup" }} />
        <Stack.Screen
          name="safety/sos-trigger"
          options={{ title: "SOS", presentation: "modal" }}
        />
        <Stack.Screen name="profile/badges" options={{ title: "Badges" }} />
        <Stack.Screen name="profile/edit" options={{ title: "Edit Profile" }} />
        <Stack.Screen name="profile/settings" options={{ title: "Settings" }} />
      </Stack>
    </AppProviders>
  );
}
