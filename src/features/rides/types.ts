export type RideSkillLevel = "beginner" | "intermediate" | "advanced";

export type RideAttendanceStatus = "pending" | "going" | "notGoing";

export type RideEvent = {
  id: string;
  title: string;
  clubName: string;
  clubId: string;
  startsAt: string;
  meetingPoint: string;
  distanceKm?: number;
  durationText?: string;
  skillLevel: RideSkillLevel;
  invitedCount: number;
  respondedCount: number;
  goingCount: number;
  droppedCount: number;
  userAttendanceStatus: RideAttendanceStatus;
  isFromJoinedClub: boolean;
  isCreatedByCurrentUser: boolean;
  isUserClubAdmin: boolean;
  bikePreference: string;
  organizerName: string;
  description: string;
  routeSummary: string;
  stops: string[];
  mandatoryGear: string[];
  optionalGear: string[];
  commentsCount: number;
};
