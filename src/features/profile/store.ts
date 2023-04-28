import { type DidKey } from "verite";

type DidStore = { didKey?: DidKey; didIon?: string };
export const didStore: DidStore = {
  didKey: undefined,
  didIon: undefined,
};
