import React from "react";
import { CredentialCard } from "./CredentialCard";
import { profilesAtom } from "../profile/atoms";
import { Verifiable, W3CCredential } from "verite";
import { For } from "@legendapp/state/react";

export const CredentialList = () => {
  // right now there's only one profile until we add support for more profiles
  // const profile = profilesAtom[0].get();

  const extractPrettyData = (credential: Verifiable<W3CCredential>) => {
    for (const [key, values] of Object.entries(credential?.credentialSubject)) {
      if (key !== "id") {
        const type = values.type;
        const date = new Date(values.approvalDate).toLocaleString();
        const issuer =
          Math.floor(Math.random() * 2) % 2 === 0
            ? "Silicon Valley Bank"
            : "FTX Inc.";
        return { type, date, issuer };
      }
    }
  };

  return (
    <For each={profilesAtom[0].credentials}>
      {(cred) => {
        const { type, date, issuer } = extractPrettyData(cred.peek()!)!;

        return <CredentialCard type={type} date={date} issuer={issuer} />;
      }}
    </For>
  );
};
