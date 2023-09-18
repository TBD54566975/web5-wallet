import type { ManagedIdentity } from "@web5/agent";
import {
  Profile,
  profileProtocol,
} from "@/features/dwn/profile-protocol/profile-protocol";
import { IdentityAgentManager } from "@/features/identity/IdentityAgentManager";

export const fetchProfile = async (identity: ManagedIdentity) => {
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
    return undefined;
  }

  const readResult = await web5.dwn.records.read({
    message: {
      recordId,
    },
  });

  if (!readResult) {
    return undefined;
  }

  return (await readResult.record.data.json()) as Profile;
};
