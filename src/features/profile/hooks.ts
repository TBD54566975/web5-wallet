import { useQueries, useQuery } from "@tanstack/react-query";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import { profileProtocol } from "./protocol/profile-protocol";
import { useIdentityListQuery } from "../identity/hooks";
import type { Profile } from "../../types/models";

/** 
  Reaches into the React Query memory cache for DWN and returns the profile for any given identity. 
*/
export const useProfileQuery = (didUri: string) => {
  return useQuery({
    queryKey: ["profile", didUri],
    queryFn: () => fetchProfile(didUri),
    staleTime: 360000,
  });
};

/** 
  Reaches into the React Query memory cache for DWN and returns all profiles. 
*/
export const useProfilesQuery = () => {
  const { data: allIdentities, isLoading: isLoadingIdentities } =
    useIdentityListQuery();

  return useQueries({
    queries:
      allIdentities?.map((identity) => ({
        queryKey: ["profile", identity.did.uri],
        queryFn: () => fetchProfile(identity.did.uri),
        staleTime: 360000,
        enabled: !isLoadingIdentities && !!allIdentities?.length,
      })) ?? [],
  });
};

const fetchProfile = async (did: string) => {
  const web5 = IdentityAgentManager.web5(did);
  const queryResult = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: profileProtocol.protocol,
        protocolPath: "profile",
      },
    },
  });

  // The Records returned with a query result DO NOT have access
  // to the data. Get the recordId we're interested in and
  // make an explicit read request to acquire a Record that DOES
  // have access to the data.
  const recordId = queryResult.records?.at(0)?.id;

  // TODO: do we still need this?
  // if (!recordId) {
  //   return identity;
  // }

  const readResult = await web5.dwn.records.read({
    message: {
      filter: {
        recordId,
      },
    },
  });

  // TODO: do we still need this?
  // if (!readResult) {
  //   return identity;
  // }

  const profile: Profile = await readResult.record.data.json();
  return profile;
};
