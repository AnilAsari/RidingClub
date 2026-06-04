import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "../../api/profile.api";
import { StateMessage } from "../../components/ui/StateMessage";
import { ProfileOverview } from "../../features/profile/components/ProfileOverview";

export default function ProfileScreen() {
  const profileQuery = useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
  });

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
