import type { DidKey } from "verite";

export type Profile = {
  id: string;
  didKey: DidKey;
  didIon: string;
  name: string;
};

export type PrettyCredential = { type: string; date: string; issuer: string };
