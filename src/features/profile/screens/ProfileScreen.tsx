import { StateMessage } from "@shared/components/StateMessage";

import { ProfileOverview } from "../components/ProfileOverview";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useProfile } from "../hooks/useProfile";

export function ProfileScreen() {
  const profileQuery = useProfile();

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <StateMessage
        title="Profile unavailable"
        message="We could not load the rider profile. Please try again."
      />
    );
  }

  return <ProfileOverview profile={profileQuery.data} />;
}
