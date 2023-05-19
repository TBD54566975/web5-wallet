import type { DidKey, Verifiable, W3CCredential } from "verite";

export type Credential = Verifiable<W3CCredential> & { id: string };

export type Profile = {
  id: string;
  didKey: DidKey;
  didIon: string;
  name: string;
  credentials: Credential[];
};

export type PrettyCredential = {
  type: string;
  date: string;
  issuer: string;
};
