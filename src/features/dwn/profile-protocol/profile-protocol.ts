export type Profile = {
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
      ],
    },
  },
  published: true,
};
