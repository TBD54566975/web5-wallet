import {
  PresentationDefinition as VeritePresentationDefinition,
  PresentationSubmission as VeritePresentationSubmission,
} from "verite";

export interface PresentationDefinition {
  kind: "PresentationDefinition";
  value: VeritePresentationDefinition;
}

export type WalletRequest = PresentationDefinition;

export interface PresentationSubmission {
  kind: "PresentationSubmission";
  value: VeritePresentationSubmission;
}

export type WalletResonse = PresentationSubmission;
