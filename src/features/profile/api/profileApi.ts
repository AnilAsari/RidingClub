import { getMockRiderProfile } from "@/src/services/mockClient";

import { RiderProfile } from "../types";

export async function getMyProfile(): Promise<RiderProfile> {
  return getMockRiderProfile();
}
