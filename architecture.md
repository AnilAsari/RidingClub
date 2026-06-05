# Rovera Frontend Architecture

This document is the source of truth for the Expo frontend structure. Route files in `app/` should stay thin. Business logic, screen UI, API access, mocks, state, and reusable UI should live under `src/`.

## Guiding Rules

- Keep `app/` for Expo Router navigation only.
- Do not place feature implementation directly in route files.
- Put feature-owned code in `src/features/<feature>/`.
- Put reusable app UI in `src/shared/components/`.
- Put mock data in `src/mocks/`.
- Do not import mocks directly from screens or components.
- Feature APIs should call a service/client layer that can return mock data now and real backend data later.
- Theme tokens must live in `src/theme/`, not inline in components.
- Prefer small reusable components over large screen files.

## Intended Structure

```text
app/
  _layout.tsx
  (auth)/
    onboarding.tsx
    login.tsx
    otp.tsx
  (setup)/
    profile-setup.tsx
    garage-setup.tsx
  (tabs)/
    _layout.tsx
    home.tsx
    clubs.tsx
    rides.tsx
    notifications.tsx
    profile.tsx
  clubs/
    [id].tsx
  events/
    [id].tsx
    create.tsx
  rides/
    active.tsx
    summary.tsx
  settings.tsx

src/
  features/
    auth/
      api/
      hooks/
      screens/
      store/
      types.ts
    onboarding/
      data/
      screens/
    profile/
      api/
      components/
      hooks/
      screens/
      types.ts
    garage/
      api/
      components/
      screens/
      types.ts
    clubs/
      api/
      components/
      hooks/
      screens/
      store/
      types.ts
    events/
      api/
      components/
      hooks/
      screens/
      types.ts
    rides/
      api/
      components/
      hooks/
      screens/
      types.ts
    maps/
      components/
      hooks/
      services/
    notifications/
      api/
      components/
      screens/
      types.ts
    safety/
      api/
      screens/
      types.ts
  shared/
    components/
    hooks/
    utils/
    constants/
  services/
    apiConfig.ts
    mockClient.ts
    httpClient.ts
    storage.ts
    queryClient.ts
  mocks/
  store/
  theme/
  types/
```

## Route File Pattern

Route files should only import and render a feature screen.

```tsx
import { ProfileScreen } from "../../src/features/profile/screens/ProfileScreen";

export default ProfileScreen;
```

The feature screen owns data loading through hooks.

```tsx
import { useProfile } from "../hooks/useProfile";

export function ProfileScreen() {
  const profileQuery = useProfile();
  // render loading, error, and success UI
}
```

## Mock Data Pattern

Screens and components must not import mock files.

```text
src/features/profile/screens/ProfileScreen.tsx
  -> src/features/profile/hooks/useProfile.ts
  -> src/features/profile/api/profileApi.ts
  -> src/services/mockClient.ts or src/services/httpClient.ts
  -> src/mocks/users.mock.ts
```

When backend APIs are ready, the feature API should switch from the mock client to the HTTP client without rewriting screens/components.

## Current Status

The current profile implementation follows the `src/` architecture:

- Profile feature code lives under `src/features/profile/`.
- Profile mock data lives under `src/mocks/`.
- Shared reusable UI lives under `src/shared/components/`.
- App providers live under `src/shared/providers/`.
- Theme tokens live under `src/theme/`.
- Route files import feature screens instead of owning feature logic.

Current route names still differ from the proposed structure:

- `app/(auth)/phone.tsx` should likely become `app/(auth)/login.tsx`.
- `app/(auth)/verify-otp.tsx` should likely become `app/(auth)/otp.tsx`.
- `profile-setup.tsx` and `garage-setup.tsx` currently live under `(auth)` but the target structure places them under `(setup)`.
- `app/(tabs)/index.tsx` works as the default tab route, but the target structure uses `home.tsx`.
- The pasted structure includes a `notifications` tab. The current app has a `routes` tab and hides `safety`.

Before implementing more screens, decide whether to rename these routes to match the proposed structure exactly or keep the current Expo Router names as accepted project conventions.
