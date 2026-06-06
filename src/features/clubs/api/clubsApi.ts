import { getMockClubs } from "@/src/services/mockClient";

import { Club } from "../types";

export async function getClubs(): Promise<Club[]> {
  return getMockClubs();
}
