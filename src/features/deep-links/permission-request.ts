export class PermissionRequest {
  descriptor: Descriptor;
  authorization: Authorization;

  constructor(descriptor: Descriptor, authorization: Authorization) {
    this.descriptor = descriptor;
    this.authorization = authorization;
  }

  static fromBase64(encoded: string): PermissionRequest {
    const decoded = JSON.parse(Buffer.from(encoded, "base64").toString());
    return new PermissionRequest(decoded.descriptor, decoded.authorization);
  }
}

type Descriptor = {
  [key: string]: any;
};

type Authorization = {
  [key: string]: any;
};
