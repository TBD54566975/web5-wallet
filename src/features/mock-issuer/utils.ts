import crypto from "crypto";
import {
  type DidKey,
  type KYCAMLAttestation,
  buildIssuer,
  randomDidKey,
  attestationToCredentialType,
  buildAndSignVerifiableCredential,
  decodeVerifiableCredential,
  Verifiable,
  W3CCredential,
  buildKycAmlManifest,
} from "verite";
import { DidState } from "@tbd54566975/dids";

const issuerDidKey = randomDidKey(crypto.randomBytes);

const mockManifest = buildKycAmlManifest({
  id: issuerDidKey.controller,
});

// full e2e flow
// holder to issuer
// verifier has not become involved yet
// const issueVerifiablePresentation = async (
//   mockApplication: string,
//   applicantDidKey: DidKey
// ) => {
//   // in a VP flow an issuer will:

//   // -1. create a presentation submission on the client

//   // 1. decode an encoded application AKA the container for the presentation submission
//   const decodedApplication = await decodeCredentialApplication(mockApplication);

//   // 2. validate that application against a manifest (bail if invalid?)
//   await validateCredentialApplication(decodedApplication, mockManifest);

//   // 3. build and sign fulfillment
//   // AKA Claim
//   // move this out of this function since it comes from the applicant
//   const mockAttestation = {
//     type: "CreditScoreAttestation",
//     score: 90,
//     scoreType: "Credit Score",
//     provider: "Experian",
//   };

//   // const mockKYCAMLAttestation: KYCAMLAttestation = {
//   //   type: "KYCAMLAttestation",
//   //   process: "https://verite.id/definitions/processes/kycaml/0.0.1/usa",
//   //   approvalDate: new Date().toISOString(),
//   // };

//   const mockIssuer = buildIssuer(issuerDidKey.id, issuerDidKey.privateKey);

//   const mockAttestationType = attestationToCredentialType(
//     "CreditScoreAttestation"
//   );

//   const credentialResponse = await buildAndSignFulfillment(
//     mockIssuer,
//     applicantDidKey,
//     mockManifest,
//     mockAttestation,
//     mockAttestationType
//   );

//   /// client code should follow in a separate function (move this out)

//   // -1. the CLIENT will decode the verifiable presentation
//   const decodedPresentation = await decodeVerifiablePresentation(
//     credentialResponse
//   );

//   // -2. the CLIENT will receive a VC in the decoded presentation
// };

// get credentials without application flow
const issueCredentials = async (
  applicantDid: DidState
): Promise<Verifiable<W3CCredential>> => {
  const mockIssuer = buildIssuer(issuerDidKey.id, issuerDidKey.privateKey);

  // Stubbed out credential data
  const mockAttestation: KYCAMLAttestation = {
    type: "KYCAMLAttestation",
    process: "https://verite.id/definitions/processes/kycaml/0.0.1/usa",
    approvalDate: new Date().toISOString(),
  };

  const mockAttestationType = attestationToCredentialType("KYCAMLAttestation");

  // Generate the signed, encoded credential
  const encoded = await buildAndSignVerifiableCredential(
    mockIssuer,
    applicantDid.id,
    mockAttestation,
    mockAttestationType
  );

  const decoded = await decodeVerifiableCredential(encoded);

  return decoded;
};

// verifier building the presentation submission
// const createSubmission = async (
//   verificationRequest: VerificationOffer,
//   credential: Verifiable<W3CCredential> | RevocableCredential,
//   applicantDidKey: DidKey // also known as holder or subject
// ) => {
//   // wrap this in a credential application
//   const request = await buildPresentationSubmission(
//     applicantDidKey,
//     // @ts-expect-error: it's a mock, so we know the presentation definition exists
//     mockManifest.presentation_definition,
//     credential
//   );
// };

export const MockIssuerUtils = {
  mockManifest,
  issueCredentials,
};

// verite's demo
// verifier: https://github.com/centrehq/verite/blob/ddb77d10fb33077b6efe7161e78f719455f730d3/packages/demo-verifier/pages/index.tsx#L232
// issuer: https://github.com/centrehq/verite/blob/ddb77d10fb33077b6efe7161e78f719455f730d3/packages/demo-issuer/pages/index.tsx
