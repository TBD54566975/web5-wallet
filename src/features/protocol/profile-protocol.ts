export type AboutProtocolType = {
  sex?: "male" | "female";
  age?: number;
  bio?: string;
  hometown?: string;
  website?: string;
  socials?: { appName: string; url: string }[];
};

export type NameProtocolType = {
  first?: string;
  last?: string;
  middle?: string;
  nickname?: string;
  maiden?: string;
};

export const profileProtocol = {
  profile: {
    definition: {
      protocol: "./",
      types: {
        name: {
          schema: "./name.schema.json",
          dataFormats: ["application/json"],
        },
        about: {
          schema: "./about.schema.json",
          dataFormats: ["application/json"],
        },
        contact: {
          schema: "./contact.schema.json",
          dataFormats: ["application/json"],
        },
        address: {
          schema: "./address.schema.json",
          dataFormats: ["application/json"],
        },
        phone: {
          schema: "./phone.schema.json",
          dataFormats: ["application/json"],
        },
        image: {
          dataFormats: ["image/png", "jpeg", "gif"],
        },
        school: {
          schema: "./school.schema.json",
          dataFormats: ["application/json"],
        },
        work: {
          schema: "./work.schema.json",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        name: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        about: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        contact: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        address: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        phone: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        image: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        school: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
        work: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
          ],
        },
      },
    },
  },
};
