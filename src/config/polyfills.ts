import { atob, btoa } from "react-native-quick-base64";

// node
import "fastestsmallesttextencoderdecoder";

// Hermes lacks AsyncIterator.
// TODO: Remove when Hermes gets AsyncIterator
import "@azure/core-asynciterator-polyfill";

import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from "@noble/hashes/sha512";
import * as secp from "@noble/secp256k1";
import * as ed from "@noble/ed25519";

// achachingbrain relying on the Event API in it-modules
import "event-target-polyfill";

global.atob = atob;
global.btoa = btoa;

// https://github.com/paulmillr/noble-ed25519/blob/6b218e41465971f1173178afbb0a2fe9c4bb77b5/README.md
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));
ed.etc.sha512Async = (...m) => Promise.resolve(ed.etc.sha512Sync!(...m));

// https://github.com/paulmillr/noble-secp256k1/blob/eeb3b069e50b53aee7042a8b83a99f56e213a2de/README.md
secp.etc.hmacSha256Sync = (k, ...m) =>
  hmac(sha256, k, secp.etc.concatBytes(...m));
secp.etc.hmacSha256Async = (k, ...m) =>
  Promise.resolve(secp.etc.hmacSha256Sync!(k, ...m));
