import { MockCredential } from "@/types/models";

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
