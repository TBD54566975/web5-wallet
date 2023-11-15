import type { ManagedIdentity } from "@web5/agent";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import { profileProtocol } from "./protocol/profile-protocol";
import type { Profile } from "../../types/models";

export const fetchProfile = async (
  identity: ManagedIdentity
): Promise<Profile> => {
  const web5 = IdentityAgentManager.web5(identity);
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
  if (!recordId) {
    return identity;
  }

  const readResult = await web5.dwn.records.read({
    message: {
      filter: {
        recordId,
      },
    },
  });

  if (!readResult) {
    return identity;
  }

  const profile = await readResult.record.data.json();
  return { ...identity, ...profile };
};
