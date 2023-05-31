import * as WebAssembly from "react-native-webassembly";
import crypto from "crypto";
import { randomDidKey } from "verite";
import { useEffect } from "react";

export const WasmExperiment = () => {
  console.log("wasm experiment");

  const doWasm = async () => {
    console.log("instantiating");
    const SSIWasm = require("./wasmWrapper");

    console.log("after instant");

    console.log("random didkey start");
    const didKey = randomDidKey(crypto.randomBytes);
    console.log("key is");
    console.log(didKey.privateKey);
    console.log("id is");
    console.log(didKey.id);

    const result = await SSIWasm.createVerifiableCredential(
      didKey.id, // didID
      JSON.stringify(didKey.privateKey) // this cant be stringified? not sure.
    );

    console.log(result);
  };

  useEffect(() => {
    doWasm();
  }, []);

  return <></>;
};
