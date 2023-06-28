// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
  },
});

config.resolver.resolveRequest = (context, moduleName, platform) => {
  //  cherrypick node bundle
  if (moduleName === "eccrypto") {
    return {
      filePath: `${__dirname}/node_modules/eccrypto/index.js`,
      type: "sourceFile",
    };
  }

  // provide the omitted entrypoints
  if (moduleName === "@decentralized-identity/ion-tools") {
    return {
      filePath: `${__dirname}/node_modules/@decentralized-identity/ion-tools/dist/esm/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "@ipld/dag-cbor") {
    return {
      filePath: `${__dirname}/node_modules/@ipld/dag-cbor/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "@ipld/dag-pb") {
    return {
      filePath: `${__dirname}/node_modules/@ipld/dag-pb/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "@multiformats/murmur3") {
    return {
      filePath: `${__dirname}/node_modules/@multiformats/murmur3/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "@tbd54566975/dwn-sdk-js") {
    return {
      filePath: `${__dirname}/node_modules/@tbd54566975/dwn-sdk-js/dist/esm/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "blockstore-core") {
    return {
      filePath: `${__dirname}/node_modules/blockstore-core/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "hamt-sharding") {
    return {
      filePath: `${__dirname}/node_modules/hamt-sharding/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "ipfs-unixfs") {
    return {
      filePath: `${__dirname}/node_modules/ipfs-unixfs/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "ipfs-unixfs-exporter") {
    return {
      filePath: `${__dirname}/node_modules/ipfs-unixfs-exporter/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "ipfs-unixfs-importer") {
    return {
      filePath: `${__dirname}/node_modules/ipfs-unixfs-importer/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/basics") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/basics.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/bases/base32") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/bases/base32.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/bases/base58") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/bases/base58.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/bases/base64") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/bases/base64.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/block") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/block.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/cid") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/cid.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/codecs/raw") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/codecs/raw.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/digest") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/hashes/digest.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/hasher") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/hashes/hasher.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/identity") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/hashes/identity.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/sha2") {
    return {
      filePath: `${__dirname}/node_modules/multiformats/src/hashes/sha2.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-all") {
    return {
      filePath: `${__dirname}/node_modules/it-all/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-batch") {
    return {
      filePath: `${__dirname}/node_modules/it-batch/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-drain") {
    return {
      filePath: `${__dirname}/node_modules/it-drain/dist/src/index.js`,
      type: "sourceFile",
    };
  }

  if (moduleName === "it-filter") {
    return {
      filePath: `${__dirname}/node_modules/it-filter/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-first") {
    return {
      filePath: `${__dirname}/node_modules/it-first/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-last") {
    return {
      filePath: `${__dirname}/node_modules/it-last/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-map") {
    return {
      filePath: `${__dirname}/node_modules/it-map/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-merge") {
    return {
      filePath: `${__dirname}/node_modules/it-merge/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-parallel") {
    return {
      filePath: `${__dirname}/node_modules/it-parallel/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-parallel-batch") {
    return {
      filePath: `${__dirname}/node_modules/it-parallel-batch/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-peekable") {
    return {
      filePath: `${__dirname}/node_modules/it-peekable/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-pipe") {
    return {
      filePath: `${__dirname}/node_modules/it-pipe/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-pushable") {
    return {
      filePath: `${__dirname}/node_modules/it-pushable/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "it-take") {
    return {
      filePath: `${__dirname}/node_modules/it-take/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "p-queue") {
    return {
      filePath: `${__dirname}/node_modules/p-queue/dist/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "progress-events") {
    return {
      filePath: `${__dirname}/node_modules/progress-events/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "protons-runtime") {
    return {
      filePath: `${__dirname}/node_modules/protons-runtime/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "uint8arraylist") {
    return {
      filePath: `${__dirname}/node_modules/uint8arraylist/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "uint8arrays/alloc") {
    return {
      filePath: `${__dirname}/node_modules/uint8arrays/dist/src/alloc.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "uint8arrays/concat") {
    return {
      filePath: `${__dirname}/node_modules/uint8arrays/dist/src/concat.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "uint8arrays/equals") {
    return {
      filePath: `${__dirname}/node_modules/uint8arrays/dist/src/equals.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "uint8arrays/from-string") {
    return {
      filePath: `${__dirname}/node_modules/uint8arrays/dist/src/from-string.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "uint8arrays/to-string") {
    return {
      filePath: `${__dirname}/node_modules/uint8arrays/dist/src/to-string.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "ulid") {
    return {
      filePath: `${__dirname}/node_modules/ulid/dist/index.esm.js`,
      type: "sourceFile",
    };
  }

  //* reference: NOOP a package
  if (moduleName === "node:crypto") {
    return { type: "empty" };
  }

  //* reference: manually resolve submodules
  // if (context.originModulePath.search("ipfs-unixfs-importer")) {
  //   if (moduleName === "hamt-sharding") {
  //     return {
  //       filePath: `${__dirname}/node_modules/ipfs-unixfs-importer/node_modules/hamt-sharding/dist/src/index.js`,
  //       type: "sourceFile",
  //     };
  //   }
  //   if (moduleName === "ipfs-unixfs") {
  //     return {
  //       filePath: `${__dirname}/node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/dist/src/index.js`,
  //       type: "sourceFile",
  //     };
  //   }
  // }

  // fallback to the default resolver
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
