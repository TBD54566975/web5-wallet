import { MockConnection } from "@/types/models";

export const mockConnections: MockConnection[] = [
  {
    name: "DIDPay",
    icon: "credit-card",
    developer: "Block Inc.",
    description: "A simple payment app built on TBDex and Web5 principles.",
    id: "did:ion:0987654321098765432109876543210987654321",
  },
  {
    name: "Dignal",
    icon: "note",
    developer: "Block Inc.",
    description:
      "A simple messaging app, inspired by Signal and built on Web5 principles.",
    id: "did:ion:1234567890123456789012345678901234567890",
  },
];
