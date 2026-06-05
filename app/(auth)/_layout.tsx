import { Stack } from "expo-router";

import { navigationTheme } from "@theme/index";

export default function AuthLayout() {
  return (
    <Stack screenOptions={navigationTheme}>
      <Stack.Screen name="onboarding" options={{ title: "Welcome" }} />
      <Stack.Screen name="phone" options={{ title: "Phone Login" }} />
      <Stack.Screen name="verify-otp" options={{ title: "Verify OTP" }} />
      <Stack.Screen name="profile-setup" options={{ title: "Profile Setup" }} />
      <Stack.Screen name="garage-setup" options={{ title: "Garage Setup" }} />
    </Stack>
  );
}
