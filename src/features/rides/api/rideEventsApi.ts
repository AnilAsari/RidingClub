import { getMockRideEvents } from "@/src/services/mockClient";

import { RideEvent } from "../types";

export async function getRideEvents(): Promise<RideEvent[]> {
  return getMockRideEvents();
}
