import { Profile as Web5Profile } from "@tbd54566975/web5-user-agent";

export type Profile = Web5Profile & {
  credentials: Credential[];
} & {
  displayName?: string;
};
