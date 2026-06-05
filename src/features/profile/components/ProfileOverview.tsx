import { AppScreen } from "@shared/components/AppScreen";
import { StyleSheet, View } from "react-native";

import { RiderProfile } from "../types";
import { BadgePreview } from "./BadgePreview";
import { GaragePreview } from "./GaragePreview";
import { ProfileActions } from "./ProfileActions";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStats } from "./ProfileStats";

type ProfileOverviewProps = {
  profile: RiderProfile;
};

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  return (
    <AppScreen contentStyle={styles.screenContent}>
      <ProfileHeader profile={profile} />
      <View style={styles.body}>
        <ProfileStats stats={profile.stats} />
        <GaragePreview bikes={profile.garage} />
        <BadgePreview badges={profile.badges} />
        <ProfileActions />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    gap: 0,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 32,
  },
  body: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
