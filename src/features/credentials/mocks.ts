import type { MockCredential } from "../../types/models";

export const mockCredentials: MockCredential[] = [
  {
    name: "U.S. Passport",
    issuer: "U.S. State Department",
    description:
      "Accepted by law everywhere your physical passport is required",
    icon: "archive" as const,
  },
  {
    name: "KYC Credential",
    issuer: "TBD (Block Inc.)",
    description: "Meets KYC requirements of most PFIs in the tbDEX network",
    icon: "issue-closed" as const,
  },
  {
    name: "Foreign Passport",
    issuer: "Foreign Department",
    description: "Foriegn passport for international ID purposes",
    icon: "archive" as const,
  },
];

export const mockProfileCredentials = [
  {
    heading: "Driver's License",
    subtitle: "All profiles",
    body: "Valid",
    iconName: "note" as const,
    badgeName: "id-badge" as const,
  },
  {
    heading: "Gym membership",
    subtitle: "Social profile",
    body: "Expired",
    iconName: "zap" as const,
    badgeName: "id-badge" as const,
  },
  {
    heading: "Employer ID",
    subtitle: "Professional profile",
    body: "Valid",
    iconName: "organization" as const,
    badgeName: "id-badge" as const,
  },
];
