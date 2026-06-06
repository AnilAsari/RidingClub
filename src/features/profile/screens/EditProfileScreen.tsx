import { Image, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@shared/components/AppScreen";
import { StateMessage } from "@shared/components/StateMessage";
import { theme } from "@theme/index";

import { ProfileField } from "../components/ProfileRows";
import { ProfileScreenHeader } from "../components/ProfileScreenHeader";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useProfile } from "../hooks/useProfile";

export function EditProfileScreen() {
  const profileQuery = useProfile();

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return <StateMessage title="Profile unavailable" message="We could not load edit profile." />;
  }

  const profile = profileQuery.data;

  return (
    <AppScreen contentStyle={styles.content}>
      <ProfileScreenHeader
        icon="create-outline"
        title="Edit Profile"
        subtitle="Manage the identity other riders see across clubs, rides, and route plans."
      />

      <View style={styles.identityCard}>
        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        <View style={styles.identityText}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.handle}>@{profile.username}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Public Details</Text>
        <ProfileField label="Display name" value={profile.name} />
        <ProfileField label="Username" value={`@${profile.username}`} helper="Used in mentions and rider search." />
        <ProfileField label="Location" value={`${profile.city}, ${profile.state}`} />
        <ProfileField label="Riding style" value={profile.ridingStyle} />
        <ProfileField label="Bio" value={profile.bio} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rider Tags</Text>
        <View style={styles.tags}>
          {profile.riderTypes.map((type) => (
            <Text key={type} style={styles.tag}>
              {type}
            </Text>
          ))}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
  },
  identityCard: {
    alignItems: "center",
    backgroundColor: "#101923",
    borderColor: "#263442",
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: "row",
    gap: 13,
    padding: 14,
  },
  avatar: {
    backgroundColor: theme.colors.elevated,
    borderColor: "#1D5F50",
    borderRadius: 28,
    borderWidth: 2,
    height: 56,
    width: 56,
  },
  identityText: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  handle: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#12231F",
    borderColor: "#1D5F50",
    borderRadius: 5,
    borderWidth: 1,
    color: "#20B293",
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
});
