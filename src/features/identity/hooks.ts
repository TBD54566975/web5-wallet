import { QueryClient, useQuery } from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { type CustomizableUseQueryOptions } from "@/types/use-query";

export const useIdentityList = (
  options: CustomizableUseQueryOptions<ManagedIdentity[]> = {}
) => {
  return useQuery<ManagedIdentity[]>({
    ...options,
    queryKey: identityListQueryKey,
    queryFn: IdentityAgentManager.listIdentities,
  });
};

export const invalidateIdentityList = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries({ queryKey: identityListQueryKey });
};

const identityListQueryKey = ["identityList"];
