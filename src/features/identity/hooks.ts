import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../app/store";
import { IdentityAgentManager } from "./IdentityAgentManager";

export const useIdentityListQuery = () => {
  return useQuery({
    queryKey: ["identityList"],
    queryFn: IdentityAgentManager.listIdentities,
    staleTime: 3600000,
  });
};

export const invalidateIdentityList = async () => {
  await queryClient.invalidateQueries({ queryKey: ["identityList"] });
};
