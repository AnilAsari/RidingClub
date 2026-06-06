import { useQuery } from "@tanstack/react-query";

import { getClubs } from "../api/clubsApi";

export function useClubs() {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
  });
}
