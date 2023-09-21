import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { type CustomizableUseQueryOptions } from "@/hooks/types";

export const useIdentityList = (
  options: CustomizableUseQueryOptions<ManagedIdentity[]> = {}
) => {
  const listIdentitiesQueryOptions: UseQueryOptions<ManagedIdentity[]> = {
    queryKey: ["allIdentities"],
    queryFn: IdentityAgentManager.listIdentities,
  };

  return useQuery({
    ...options,
    ...listIdentitiesQueryOptions,
  });
};
