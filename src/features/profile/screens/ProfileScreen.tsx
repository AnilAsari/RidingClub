import { StateMessage } from "@shared/components/StateMessage";

import { ProfileOverview } from "../components/ProfileOverview";
import { useProfile } from "../hooks/useProfile";

export function ProfileScreen() {
  const profileQuery = useProfile();

  if (profileQuery.isLoading) {
    return <StateMessage title="Loading profile" message="Getting your rider profile ready." />;
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
