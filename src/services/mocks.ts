import type { MockConnection, MockCredential } from "@/types/models";

export const mockCredentials: MockCredential[] = [
  {
    name: "U.S. Passport",
    issuer: "U.S. State Department",
    description:
      "Accepted by law everywhere your physical passport is required",
    icon: "archive",
  },
  {
    name: "KYC Credential",
    issuer: "TBD (Block Inc.)",
    description: "Meets KYC requirements of most PFIs in the tbDEX network",
    icon: "issue-closed",
  },
  {
    name: "Foreign Passport",
    issuer: "Foreign Department",
    description: "Foriegn passport for international ID purposes",
    icon: "archive",
  },
];

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

// TODO: Clean up mocks elsewhere:
// @/pages/default/credentials/Credentials.tsx
// @/pages/default/credentials/CredentialDetail.tsx
// @/pages/default/connections/Connections.tsx
// @/pages/default/connections/ReviewConnections.tsx
// @/pages/default/activity/Activity.tsx
