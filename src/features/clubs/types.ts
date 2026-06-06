export type ClubType = "city" | "brand" | "bikeModel" | "touring" | "private" | "verified";

export type ClubVisibility = "public" | "private" | "restricted";

export type ClubJoinPolicy = "instant" | "approval" | "inviteOnly";

export type UserMembershipStatus = "notJoined" | "joined" | "requested";

export type ClubRestriction = {
  bikeMake?: string;
  bikeModel?: string;
  label: string;
};

export type ClubPlannedRide = {
  id: string;
  title: string;
  dateLabel: string;
  distanceKm: number;
  startPoint: string;
};

export type Club = {
  id: string;
  name: string;
  handle: string;
  location: string;
  clubType: ClubType;
  visibility: ClubVisibility;
  joinPolicy: ClubJoinPolicy;
  isVerified: boolean;
  isOfficialBrandClub?: boolean;
  restrictionText?: string;
  totalMembers: number;
  totalRidesHosted: number;
  upcomingRidesCount: number;
  nextRideDate?: string;
  lastRideDate?: string;
  tags: string[];
  userMembershipStatus: UserMembershipStatus;
  description: string;
  plannedRides: ClubPlannedRide[];
  isInvited?: boolean;
  restriction?: ClubRestriction;
};
