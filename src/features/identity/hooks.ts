import { useQuery } from "@tanstack/react-query";
import { IdentityAgentManager } from "./IdentityAgentManager";

export const useIdentityListQuery = () => {
  return useQuery({
    queryKey: ["identityList"],
    queryFn: IdentityAgentManager.listIdentities,
    staleTime: 3600000,
  });
};
