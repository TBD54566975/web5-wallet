import { useQuery } from "@tanstack/react-query";
import { type ManagedIdentity } from "@web5/agent";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";
import { type CustomizableUseQueryOptions } from "@/hooks/types";

export const useIdentityList = (
  options: CustomizableUseQueryOptions<ManagedIdentity[]> = {}
) => {
  return useQuery<ManagedIdentity[]>({
    ...options,
    queryKey: ["allIdentities"],
    queryFn: IdentityAgentManager.listIdentities,
  });
};
