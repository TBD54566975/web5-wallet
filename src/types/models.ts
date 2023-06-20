import { DidState } from "@tbd54566975/dids";
import type { Verifiable, W3CCredential } from "verite";

export type Credential = Verifiable<W3CCredential> & { id: string };

export type Profile = {
  id: string;
  didKey: DidState;
  didIon: DidState;
  name: string;
  credentials: Credential[];
};

export type PrettyCredential = {
  type: string;
  date: string;
  issuer: string;
};
