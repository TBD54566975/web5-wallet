import { VerifiableCredential } from "@web5/credentials";

// temporary store outside of DWN
export const credentialStore = new Map<string, VerifiableCredential>();
export const credentialStoreActions = {
  initDemoVC: () => {
    try {
      const driversLicenseVcJwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NiRmkxUEdxNm1tQUxic2ZQalVBVjl1YWNlakVrSnZENHc0Q1h1d1JIUFB5I3o2TWtzYkZpMVBHcTZtbUFMYnNmUGpVQVY5dWFjZWpFa0p2RDR3NENYdXdSSFBQeSJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRHJpdmVyTGljZW5zZUNyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDoyNTMyMGQyZS0zNzgwLTQwMTktOTBhMi01ZjZjY2FiZjk3OGUiLCJpc3N1ZXIiOiJkaWQ6a2V5Ono2TWtzYkZpMVBHcTZtbUFMYnNmUGpVQVY5dWFjZWpFa0p2RDR3NENYdXdSSFBQeSIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDEtMjZUMjE6MTk6MDZaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6a2V5Ono2TWtzV3hLcDU5RENYc0R4eTNKdThpaER2NEp0akdodnNYZWlRQUFvZDE2a1RWcCIsImxpY2Vuc2VOdW1iZXIiOiJYMTIzLTQ1NjctODkwMSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImJpcnRoRGF0ZSI6IjE5OTAtMDEtMDEiLCJhZGRyZXNzIjp7InN0cmVldEFkZHJlc3MiOiIxMjMgTWFpbiBTdCIsImNpdHkiOiJBbnl0b3duIiwic3RhdGUiOiJDQSIsInBvc3RhbENvZGUiOiIxMjM0NSJ9LCJsaWNlbnNlQ2xhc3MiOiJDIiwiZW5kb3JzZW1lbnRzIjpbIk5vbmUiXSwicmVzdHJpY3Rpb25zIjpbIkNvcnJlY3RpdmUgTGVuc2VzIl19fSwiaXNzIjoiZGlkOmtleTp6Nk1rc2JGaTFQR3E2bW1BTGJzZlBqVUFWOXVhY2VqRWtKdkQ0dzRDWHV3UkhQUHkiLCJzdWIiOiJkaWQ6a2V5Ono2TWtzV3hLcDU5RENYc0R4eTNKdThpaER2NEp0akdodnNYZWlRQUFvZDE2a1RWcCJ9.B9E9YA2YMWIXCCVGYYEuBXnWWrnR0PFpNVVTnO66lT3NQt_2KuXixH92hJtm1Z5EgQn8wqhEOc7P3iB3WrseDw";
      const passsportVcJwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NiRmkxUEdxNm1tQUxic2ZQalVBVjl1YWNlakVrSnZENHc0Q1h1d1JIUFB5I3o2TWtzYkZpMVBHcTZtbUFMYnNmUGpVQVY5dWFjZWpFa0p2RDR3NENYdXdSSFBQeSJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGFzc3BvcnRDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6ZDkyYTFhMmEtNzg2MC00ZmQ3LWJkMmQtZjliZjcwMjYyMDQ0IiwiaXNzdWVyIjoiZGlkOmV4YW1wbGU6cGFzc3BvcnRBdXRob3JpdHkiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAxLTI2VDIxOjE5OjA2WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmV4YW1wbGU6amFuZURvZSIsInBhc3Nwb3J0TnVtYmVyIjoiMTIzNDU2Nzg5IiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwibmF0aW9uYWxpdHkiOiJFeGFtcGxlc3RhbiIsImJpcnRoRGF0ZSI6IjE5OTAtMDEtMDEiLCJwbGFjZU9mQmlydGgiOiJFeGFtcGxlIENpdHkiLCJpc3N1ZURhdGUiOiIyMDIwLTAxLTAxIiwiZXhwaXJ5RGF0ZSI6IjIwMzAtMDEtMDEiLCJnZW5kZXIiOiJGIn19LCJpc3MiOiJkaWQ6ZXhhbXBsZTpwYXNzcG9ydEF1dGhvcml0eSIsInN1YiI6ImRpZDpleGFtcGxlOmphbmVEb2UifQ.OYpHeNUbzFAMj-aeis9JphMrITmkOsclihFVCnkAPK7cyM4uxW30R7cOvQmzUarfTm3dMJ86YeIPwwo9Gip1BA";

      const firstVC = VerifiableCredential.parseJwt({
        vcJwt: driversLicenseVcJwt,
      });
      const secondVC = VerifiableCredential.parseJwt({
        vcJwt: passsportVcJwt,
      });

      credentialStore.set(driversLicenseVcJwt, firstVC);
      credentialStore.set(passsportVcJwt, secondVC);

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
