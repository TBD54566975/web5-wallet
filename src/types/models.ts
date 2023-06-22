import type { Verifiable, W3CCredential } from "verite";
import { Profile as Web5Profile } from "@tbd54566975/web5-user-agent";

export type Credential = Verifiable<W3CCredential> & { id: string };

export type Profile = Web5Profile & {
  credentials: Credential[];
};

export type PrettyCredential = {
  type: string;
  date: string;
  issuer: string;
};
