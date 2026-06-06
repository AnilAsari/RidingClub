import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { StateMessage } from "@shared/components/StateMessage";

import { ClubCard } from "../components/ClubCard";
import { ClubDetailsSheet } from "../components/ClubDetailsSheet";
import { ClubDiscoveryHeader } from "../components/ClubDiscoveryHeader";
import { ClubFilter, ClubFilterBar, getClubFilterLabel } from "../components/ClubFilterBar";
import { ClubListSkeleton } from "../components/ClubListSkeleton";
import { useClubs } from "../hooks/useClubs";
import { Club } from "../types";

export function ClubDiscoveryScreen() {
  const clubsQuery = useClubs();
  const [activeFilter, setActiveFilter] = useState<ClubFilter>("all");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const filteredClubs = useMemo(() => {
    const clubs = clubsQuery.data ?? [];

    if (activeFilter === "all") {
      return clubs;
    }

    if (activeFilter === "my-clubs") {
      return clubs.filter((club) => club.userMembershipStatus === "joined");
    }

    if (activeFilter === "verified") {
      return clubs.filter((club) => club.isVerified);
    }

    if (activeFilter === "bikeModel") {
      return clubs.filter((club) => club.clubType === "bikeModel" || club.clubType === "brand");
    }

    return clubs.filter((club) => club.clubType === activeFilter);
  }, [activeFilter, clubsQuery.data]);

  if (clubsQuery.isLoading) {
    return <ClubListSkeleton />;
  }

  if (clubsQuery.isError || !clubsQuery.data) {
    return (
      <StateMessage
        title="Clubs unavailable"
        message="We could not load club discovery right now. Please try again."
      />
    );
  }

  return (
    <AppScreen contentStyle={styles.content}>
      <ClubDiscoveryHeader
        activeFilterLabel={getClubFilterLabel(activeFilter)}
        filtersVisible={filtersVisible}
        onToggleFilters={() => setFiltersVisible((isVisible) => !isVisible)}
      />
      {filtersVisible ? (
        <ClubFilterBar
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />
      ) : null}
      <View style={styles.clubList}>
        {filteredClubs.map((club) => (
          <ClubCard key={club.id} club={club} onPress={setSelectedClub} />
        ))}
      </View>
      <ClubDetailsSheet
        club={selectedClub}
        onClose={() => setSelectedClub(null)}
        visible={Boolean(selectedClub)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
  },
  clubList: {
    gap: 14,
  },
});
