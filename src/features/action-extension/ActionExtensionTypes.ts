import { PresentationDefinition as VeritePresentationDefinition } from "verite";

export interface PresentationDefinition {
  kind: "PresentationDefinition";
  value: VeritePresentationDefinition;
}

export type WalletRequest = PresentationDefinition;
