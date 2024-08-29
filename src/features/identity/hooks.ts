import { useMutation, useQuery } from "@tanstack/react-query";
import { IdentityAgentManager } from "./IdentityAgentManager";
import { queryClient } from "../app/queryclient";
import { useNavigation } from "@react-navigation/native";

export const useIdentityListQuery = () => {
  return useQuery({
    queryKey: ["identityList"],
    queryFn: IdentityAgentManager.listIdentities,
    staleTime: 3600000,
  });
};

export const useAddIdentityMutation = () => {
  const { goBack } = useNavigation();

  return useMutation({
    mutationFn: async ({ profileName, dwnEndpoint }: { profileName: string, dwnEndpoint: string }) => {
      await IdentityAgentManager.createIdentity(profileName, dwnEndpoint);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["identityList"] });
      goBack();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
