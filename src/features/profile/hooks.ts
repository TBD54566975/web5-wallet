import { useQueries, useQuery } from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import { fetchProfile } from "./fetch-profile";

export const useProfileQuery = (identity: ManagedIdentity) => {
  return useQuery({
    queryKey: ["profile", identity.did],
    queryFn: () => fetchProfile(identity),
    staleTime: 360000,
  });
};

export const useProfilesQuery = (allIdentities: ManagedIdentity[]) => {
  return useQueries({
    queries: allIdentities.map((identity) => ({
      queryKey: ["profile", identity.did],
      queryFn: () => fetchProfile(identity),
      staleTime: 360000,
      enabled: !!allIdentities.length,
    })),
  });
};
