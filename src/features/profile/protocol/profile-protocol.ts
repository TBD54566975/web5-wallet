export type ProfileProtocol = {
  displayName: string;
};

// TODO: Needs to be fixed depending on what we do with Protocols: https://github.com/TBD54566975/web5-wallet/issues/66
export const profileProtocol = {
  protocol: "http://garfield.com/profile.schema.json",
  types: {
    profile: {
      schema: "http://garfield.com/profile.schema.json",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    profile: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        // TODO: remove the following rule.
        // This only exists currently due to a bug where ManagedIdentities
        // aren't being considered the DWN's tentant.
        {
          who: "anyone",
          can: "write",
        },
      ],
    },
  },
  published: true,
};
