import {
  type UseQueryOptions,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import {
  type FetchProfileResult,
  fetchProfile,
} from "@/features/profile/fetch-profile";
import { type CustomizableUseQueryOptions } from "@/types/use-query";

export const useProfile = (
  identity: ManagedIdentity,
  options: CustomizableUseQueryOptions<FetchProfileResult> = {}
) => {
  return useQuery({
    ...options,
    ...fetchProfileQueryOptions(identity),
  });
};

export const useProfiles = (
  managedIdentities: ManagedIdentity[],
  options: CustomizableUseQueryOptions<FetchProfileResult> = {}
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
): UseQueryOptions<FetchProfileResult> {
  return {
    queryKey: ["profile", identity.did],
    queryFn: () => fetchProfile(identity),
  };
}
