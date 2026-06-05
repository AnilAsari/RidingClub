import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import { theme } from "@theme/index";

import { RiderBadge, RiderProfile } from "../types";

type ProfileHeaderProps = {
  profile: RiderProfile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const featuredBadges = profile.badges.slice(0, 3);

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: profile.coverImageUrl }}
        style={styles.cover}
        imageStyle={styles.coverImage}
      >
        <Text style={styles.coverText}>ROVERA RIDER</Text>
      </ImageBackground>
      <View style={styles.avatarRow}>
        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        <View style={styles.featuredBadges}>
          {featuredBadges.map((badge) => (
            <FeaturedBadge key={badge.id} badge={badge} />
          ))}
        </View>
      </View>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.meta}>
        @{profile.username} · {profile.city} · Member since{" "}
        {new Date(profile.memberSince).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })}
      </Text>
      <View style={styles.tagRow}>
        {profile.riderTypes.map((type) => (
          <Text key={type} style={styles.tag}>
            {type}
          </Text>
        ))}
      </View>
    </View>
  );
}

function FeaturedBadge({ badge }: { badge: RiderBadge }) {
  return (
    <View style={[styles.featuredBadge, { backgroundColor: badge.color }]}>
      <Ionicons
        name={badge.icon as keyof typeof Ionicons.glyphMap}
        color={theme.colors.text}
        size={18}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#080D0F",
  },
  cover: {
    height: 180,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "#0E6E58",
  },
  coverImage: {
    resizeMode: "cover",
  },
  coverText: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
  },
  avatarRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderColor: "#080D0F",
    borderWidth: 5,
    backgroundColor: theme.colors.elevated,
    outlineColor: "#1F7A68",
    outlineStyle: "solid",
    outlineWidth: 2,
  },
  featuredBadges: {
    flexDirection: "row",
    gap: 7,
    paddingBottom: 20,
  },
  featuredBadge: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: 19,
    borderColor: "#080D0F",
    borderWidth: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 18,
    paddingHorizontal: 20,
  },
  meta: {
    color: "#6F7E78",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  tag: {
    alignItems: "center",
    color: "#24B494",
    backgroundColor: "#12231F",
    borderColor: "#21473D",
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 13,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
