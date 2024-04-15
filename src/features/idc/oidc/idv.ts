import { Jwt } from "@web5/credentials";
import { fetchTyped } from "../../../utils/fetch";
import { DidDht } from "@web5/dids";
import type { BearerIdentity } from "@web5/agent";
export const createIdToken = async (
  identities: BearerIdentity[],
  nonce: string,
  client_id: string
) => {
  // TODO: select profile?
  const did = await DidDht.create();

  const expirationDurationInSeconds = 300;
  const nowEpochSeconds = Math.floor(Date.now() / 1000);
  const exp = nowEpochSeconds + expirationDurationInSeconds;

  const jwt = await Jwt.sign({
    signerDid: did,
    payload: {
      iss: did.uri,
      sub: did.uri,
      aud: client_id,
      exp,
      iat: nowEpochSeconds,
      nonce,
    },
  });

  return jwt;
};

export const postAuthResponse = async (
  response_uri: string,
  idTokenJWT?: string
) => {
  if (idTokenJWT) {
    const payload = JSON.stringify({
      id_token: idTokenJWT,
    });

    type AuthResponse = { url: string };
    const response = await fetchTyped<AuthResponse>(response_uri, {
      method: "POST",
      body: payload,
    });

    const idvUrl = response?.url;

    return idvUrl;
  }

  console.warn("No idTokenJWT");
};
