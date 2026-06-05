import { mockRiderProfile } from "@/src/mocks/profile.mock";

const mockNetworkDelayMs = 250;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMockRiderProfile() {
  await wait(mockNetworkDelayMs);
  return mockRiderProfile;
}
