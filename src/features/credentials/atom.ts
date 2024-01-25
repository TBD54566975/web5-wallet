import { VerifiableCredential } from "@web5/credentials";

// temporary store outside of DWN
export const credentialStore = new Map<string, VerifiableCredential>();
export const credentialStoreActions = {
  initDemoVC: () => {
    try {
      const firstNameVcJwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NheE5VNGl1ZHlYRm5KaVJpSll1ZXZLM0pKbzhoMVZYR0M4c0Jzb0JOV0J6I3o2TWtzYXhOVTRpdWR5WEZuSmlSaUpZdWV2SzNKSm84aDFWWEdDOHNCc29CTldCeiJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRmlyc3ROYW1lIl0sImlkIjoidXJuOnV1aWQ6MTQyYzUzOTAtNDVlMC00MjQ2LWI4ZGYtMDM4M2YyMTc3Njg4IiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rc2F4TlU0aXVkeVhGbkppUmlKWXVldkszSkpvOGgxVlhHQzhzQnNvQk5XQnoiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAxLTEyVDIzOjIxOjA5WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6Nk1rc2F4TlU0aXVkeVhGbkppUmlKWXVldkszSkpvOGgxVlhHQzhzQnNvQk5XQnoiLCJmaXJzdE5hbWUiOiJTYXRvc2hpIn19LCJpc3MiOiJkaWQ6a2V5Ono2TWtzYXhOVTRpdWR5WEZuSmlSaUpZdWV2SzNKSm84aDFWWEdDOHNCc29CTldCeiIsInN1YiI6ImRpZDprZXk6ejZNa3NheE5VNGl1ZHlYRm5KaVJpSll1ZXZLM0pKbzhoMVZYR0M4c0Jzb0JOV0J6In0.1qwiaiBXZJszwhChYI4V4H_ad_tLq9YsfE4pcStyjJwXjyH7UKp0OodXtoJaLP1cbV27KyNBaI0ntoTgTJelBw";
      const knownCustomerVcJwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3RVN0tVZG1rVTMzbXlaelA5d2tXaGZXc0xheEdSOGp5bWU2eFRuVHl3TTNuI3o2TWt0VTdLVWRta1UzM215WnpQOXdrV2hmV3NMYXhHUjhqeW1lNnhUblR5d00zbiJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiS25vd25DdXNvbXRlciJdLCJpZCI6InVybjp1dWlkOjM3MTFkZTIxLTgyMjctNGQzNS04YzM0LWRkMDRjNWFjMjc2YyIsImlzc3VlciI6ImRpZDprZXk6ejZNa3RVN0tVZG1rVTMzbXlaelA5d2tXaGZXc0xheEdSOGp5bWU2eFRuVHl3TTNuIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMS0xNlQyMTo0ODozM1oiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDprZXk6ejZNa3NheE5VNGl1ZHlYRm5KaVJpSll1ZXZLM0pKbzhoMVZYR0M4c0Jzb0JOV0J6Iiwia25vd25DdXNvbXRlciI6dHJ1ZX19LCJpc3MiOiJkaWQ6a2V5Ono2TWt0VTdLVWRta1UzM215WnpQOXdrV2hmV3NMYXhHUjhqeW1lNnhUblR5d00zbiIsInN1YiI6ImRpZDprZXk6ejZNa3NheE5VNGl1ZHlYRm5KaVJpSll1ZXZLM0pKbzhoMVZYR0M4c0Jzb0JOV0J6In0.UcRDsn14Qb_Wsoqex_kNcUnY06XnkgcJLvjWy6HLrvXZL6W3W4MjYKPLbGW2KlRZlk7V71l1VAjrGz3Fm4TYCA";

      const firstNameVC = VerifiableCredential.parseJwt({
        vcJwt: firstNameVcJwt,
      });
      const knownCustomerVC = VerifiableCredential.parseJwt({
        vcJwt: knownCustomerVcJwt,
      });

      credentialStore.set(firstNameVcJwt, firstNameVC);
      credentialStore.set(knownCustomerVcJwt, knownCustomerVC);

      // const issuer = decodedVC.issuer;
      // const subject = decodedVC.subject;
      // const dateAcquired = decodedVC.vcDataModel.issuanceDate;

      // Note: Credential subject is dynamic data and these fields may not exist in every VC
      // const credSubject: Record<string, any> =
      //   decodedVC.vcDataModel.credentialSubject;
      // const firstName = credSubject?.firstName;
    } catch (e) {}
  },
};
