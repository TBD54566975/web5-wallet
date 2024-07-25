import { DwnInterfaceName, DwnMethodName } from "@tbd54566975/dwn-sdk-js";
import { utils } from "@web5/crypto";
import { IdentityAgentManager } from "../identity/IdentityAgentManager";
import { Convert } from "@web5/common";
import { DidDht } from "@web5/dids";
// eslint-disable-next-line import/named
import { Oidc, type Web5ConnectAuthRequest } from "@web5/agent";

const submitAuthResponse = async (
  authRequest: Web5ConnectAuthRequest,
  selectedDids: string[]
) => {
  const ephemeralDid = await DidDht.create();
  const ephemeralDidExported = await ephemeralDid.export();

  try {
    const grantPromises = selectedDids.map(async (did) => {
      const web5 = IdentityAgentManager.web5(did);

      const permissionRequestData = {
        description: "Garfield wants access to Lasagna in order to eat",
        scope: {
          interface: DwnInterfaceName.Records,
          method: DwnMethodName.Write,
          protocol: "http://profile-protocol.xyz",
        },
      };

      const writeResponse = await web5.dwn.records.write({
        data: "I hate mondays!",
        message: {
          recipient: ephemeralDid.uri,
          protocolPath: "grant",
          protocol: " https://tbd.website/dwn/permissions",
          dataFormat: "application/json",
          data: Convert.object(permissionRequestData).toUint8Array(),
        },
      });

      return writeResponse.record?.rawMessage;
    });

    const dwnGrantMessages = (await Promise.all(grantPromises)).flat();

    const responseObject = await Oidc.createResponseObject({
      iss: "https://self-issued.me/v2",
      sub: ephemeralDid.uri,
      aud: authRequest.redirect_uri,
      nonce: authRequest.nonce,
      delegatedGrants: dwnGrantMessages,
      privateKeyJwks: ephemeralDidExported.privateKeys!,
    });

    // Sign the Response Object using the ephemeral DID's signing key.
    const responseObjectJwt = await Oidc.signJwt({
      did: ephemeralDid,
      data: responseObject,
    });
    const clientDid = await DidDht.resolve(authRequest.client_id);
    const sharedKey = await Oidc.deriveSharedKey(
      ephemeralDid,
      clientDid?.didDocument!
    );

    const nonce = utils.randomBytes(24);
    const encryptedResponse = Oidc.encryptAuthResponse({
      jwt: responseObjectJwt!,
      nonce,
      encryptionKey: sharedKey,
      providerDidKid: ephemeralDid.document.verificationMethod![0].id,
    });

    const formEncodedRequest = new URLSearchParams({
      id_token: encryptedResponse,
      state: authRequest.state,
      nonce: Convert.uint8Array(nonce).toBase64Url(),
    }).toString();

    await fetch(authRequest.redirect_uri, {
      body: formEncodedRequest,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

export const ProviderWalletConnect = {
  submitAuthResponse,
};
