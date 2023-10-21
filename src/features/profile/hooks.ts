import {
  type UseQueryOptions,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { fetchProfile } from "@/features/profile/fetch-profile";
import { type ManagedIdentity } from "@web5/agent";
import { type CustomizableUseQueryOptions } from "@/types/use-query";
import { type Profile } from "@/types/models";

export const useProfile = (
  identity: ManagedIdentity,
  options: CustomizableUseQueryOptions<Profile> = {}
) => {
  return useQuery({
    ...options,
    ...fetchProfileQueryOptions(identity),
  });
};

export const useProfiles = (
  managedIdentities: ManagedIdentity[],
  options: CustomizableUseQueryOptions<Profile> = {}
) => {
  return useQueries({
    queries: managedIdentities.map((identity) => {
      return {
        ...options,
        ...fetchProfileQueryOptions(identity),
      };
    }),
  });
};

function fetchProfileQueryOptions(
  identity: ManagedIdentity
): UseQueryOptions<Profile> {
  return {
    queryKey: ["profile", identity.did],
    queryFn: () => fetchProfile(identity),
  };
}
