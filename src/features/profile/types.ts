export type RiderBike = {
  id: string;
  make: string;
  model: string;
  year: number;
  nickname: string;
  engineCc: number;
  loggedKm: number;
};

export type RiderBadge = {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
  icon: string;
  color: string;
};

export type RiderStat = {
  label: string;
  value: string;
  helper: string;
};

export type RiderProfile = {
  id: string;
  name: string;
  username: string;
  city: string;
  state: string;
  ridingStyle: string;
  riderTypes: string[];
  avatarUrl: string;
  coverImageUrl: string;
  memberSince: string;
  bio: string;
  stats: RiderStat[];
  garage: RiderBike[];
  badges: RiderBadge[];
};
