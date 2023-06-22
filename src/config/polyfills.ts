import { atob, btoa } from "react-native-quick-base64";
import "fastestsmallesttextencoderdecoder";

// Hermes lacks AsyncIterator.
// TODO: Remove when Hermes gets AsyncIterator
import "@azure/core-asynciterator-polyfill";

// achachingbrain is relying on the old Event API in it-modules
global.event = require("react-native/Libraries/Events/EventPolyfill").default;

global.atob = atob;
global.btoa = btoa;
