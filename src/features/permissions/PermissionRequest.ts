import { Buffer } from "buffer";

export class PermissionRequest {
  descriptor: Descriptor;
  authorization: Authorization;

  static fromBase64(encoded: string): PermissionRequest {
    return JSON.parse(Buffer.from(encoded, "base64").toString());
  }
}
// TODO: Once permission request format is more solidified, define the types below properly
type Descriptor = Record<string, any>;
type Authorization = Record<string, any>;
