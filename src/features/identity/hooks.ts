import { useQuery } from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import { queryClient } from "@/features/app/store";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { type CustomizableUseQueryOptions } from "@/types/use-query";

export const useIdentityList = (
  options: CustomizableUseQueryOptions<ManagedIdentity[]> = {}
) => {
  return useQuery<ManagedIdentity[]>({
    ...options,
    queryKey: identityListQueryKey,
    queryFn: IdentityAgentManager.listIdentities,
    staleTime: 3600000,
  });
};

export const invalidateIdentityList = async () => {
  await queryClient.invalidateQueries({ queryKey: identityListQueryKey });
};

const identityListQueryKey = ["identityList"];
