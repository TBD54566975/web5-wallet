export type ProfileProtocol = {
  displayName: string;
  did: string;
};

// TODO: Needs to be fixed depending on what we do with Protocols: https://github.com/TBD54566975/web5-wallet/issues/66
export const profileProtocol = {
  protocol: "http://profile-protocol.xyz",
  published: true,
  types: {
    profile: {
      schema: "http://profile-protocol.xyz/schema/profile",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    profile: {
      $actions: [
        {
          who: "anyone",
          can: ["create", "update"],
        },
        // TODO: remove the following rule.
        // This only exists currently due to a bug where ManagedIdentities
        // aren't being considered the DWN's tentant.
      ],
    },
  },
};
