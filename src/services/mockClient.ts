import { mockRiderProfile } from "@/src/mocks/profile.mock";
import { mockClubs } from "@/src/mocks/clubs.mock";
import { Club } from "@features/clubs/types";
import { RiderBike } from "@features/profile/types";

const mockNetworkDelayRangeMs = {
  max: 3000,
  min: 2000,
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMockRiderProfile() {
  await wait(getMockNetworkDelayMs());
  return mockRiderProfile;
}

export async function getMockClubs() {
  await wait(getMockNetworkDelayMs());
  return mockClubs.filter((club) => canUserDiscoverClub(club, mockRiderProfile.garage));
}

function getMockNetworkDelayMs() {
  const { max, min } = mockNetworkDelayRangeMs;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function canUserDiscoverClub(club: Club, garage: RiderBike[]) {
  if (club.visibility === "public") {
    return true;
  }

  if (club.visibility === "private") {
    return club.userMembershipStatus === "joined" || club.isInvited;
  }

  if (!club.restriction?.bikeMake) {
    return false;
  }

  return garage.some((bike) => isGarageBikeEligible(bike, club));
}

function isGarageBikeEligible(bike: RiderBike, club: Club) {
  const sameMake = bike.make.toLowerCase() === club.restriction?.bikeMake?.toLowerCase();

  if (club.clubType === "brand") {
    return sameMake;
  }

  const sameModel = club.restriction?.bikeModel
    ? bike.model.toLowerCase().includes(club.restriction.bikeModel.toLowerCase())
    : true;

  return sameMake && sameModel;
}
