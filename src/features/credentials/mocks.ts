import { BadgeNames } from "@/components/Item";
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

export const mockProfileCredentials = [
  {
    heading: "Driver's License",
    subtitle: "All profiles",
    body: "Valid",
    iconName: "note" as const,
    badgeName: BadgeNames.CREDENTIAL,
  },
  {
    heading: "Gym membership",
    subtitle: "Social profile",
    body: "Expired",
    iconName: "zap" as const,
    badgeName: BadgeNames.CREDENTIAL,
  },
  {
    heading: "Employer ID",
    subtitle: "Professional profile",
    body: "Valid",
    iconName: "organization" as const,
    badgeName: BadgeNames.CREDENTIAL,
  },
];
