import { useQuery } from "@tanstack/react-query";

import { getRideEvents } from "../api/rideEventsApi";

export function useRideEvents() {
  return useQuery({
    queryKey: ["ride-events"],
    queryFn: getRideEvents,
  });
}
