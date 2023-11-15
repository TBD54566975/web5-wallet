import {
  type UseQueryOptions,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import { fetchProfile } from "./fetch-profile";
import type { Profile } from "../../types/models";
import type { CustomizableUseQueryOptions } from "../../types/use-query";

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
