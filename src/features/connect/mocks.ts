import { MockConnection } from "@/types/models";

export const mockConnections: MockConnection[] = [
  {
    name: "DIDPay",
    status: "Connected to Social profile",
    icon: "credit-card",
    developer: "Block Inc.",
    description: "A simple payment app built on TBDex and Web5 principles.",
    id: "did:ion:0987654321098765432109876543210987654321",
  },
  {
    name: "Dignal",
    status: "Connected to 2 profiles",
    icon: "note",
    developer: "Block Inc.",
    description:
      "A simple messaging app, inspired by Signal and built on Web5 principles.",
    id: "did:ion:1234567890123456789012345678901234567890",
  },
  {
    name: "Dinder",
    status: "Connected to Social profile",
    icon: "flame",
    developer: "Block Inc.",
    description: "A simple dating app built on TBDex and Web5 principles.",
    id: "did:ion:0987654321098765432109876543210987654321",
  },
  {
    name: "Dwitter",
    status: "Connected to Social profile",
    icon: "x",
    developer: "Block Inc.",
    description:
      "A simple microblogging app, inspired by Xwitter and built on Web5 principles.",
    id: "did:ion:1234567890123456789012345678901234567890",
  },
];
