const currentDir = process.cwd();

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // TODO: remove after rn73
    sourceExts: ["ts", "tsx", "js", "jsx", "json", "cjs", "mjs"],
    resolveRequest: (context, moduleName, platform) => {
      // provide the omitted entrypoints
      if (moduleName === "@ipld/dag-cbor") {
        return {
          filePath: `${currentDir}/node_modules/@ipld/dag-cbor/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "@ipld/dag-pb") {
        return {
          filePath: `${currentDir}/node_modules/@ipld/dag-pb/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "@multiformats/murmur3") {
        return {
          filePath: `${currentDir}/node_modules/@multiformats/murmur3/src/index.js`,
          type: "sourceFile",
        };
      }
      // remove after removing named exports from upstream
      if (moduleName === "@tbd54566975/dwn-sdk-js/tests") {
        return {
          filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/dist/esm/tests/test-suite.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "blockstore-core") {
        return {
          filePath: `${currentDir}/node_modules/blockstore-core/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "hamt-sharding") {
        return {
          filePath: `${currentDir}/node_modules/hamt-sharding/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "ipfs-unixfs") {
        return {
          filePath: `${currentDir}/node_modules/ipfs-unixfs/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "ipfs-unixfs-exporter") {
        return {
          filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "ipfs-unixfs-importer") {
        return {
          filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (context.originModulePath.search("ipfs-unixfs-importer")) {
        if (moduleName === "hamt-sharding") {
          return {
            filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/hamt-sharding/dist/src/index.js`,
            type: "sourceFile",
          };
        }
        if (moduleName === "ipfs-unixfs") {
          return {
            filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/dist/src/index.js`,
            type: "sourceFile",
          };
        }
      }

      if (moduleName === "it-all") {
        return {
          filePath: `${currentDir}/node_modules/it-all/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-batch") {
        return {
          filePath: `${currentDir}/node_modules/it-batch/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-drain") {
        return {
          filePath: `${currentDir}/node_modules/it-drain/dist/src/index.js`,
          type: "sourceFile",
        };
      }

      if (moduleName === "it-filter") {
        return {
          filePath: `${currentDir}/node_modules/it-filter/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-first") {
        return {
          filePath: `${currentDir}/node_modules/it-first/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-last") {
        return {
          filePath: `${currentDir}/node_modules/it-last/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-map") {
        return {
          filePath: `${currentDir}/node_modules/it-map/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-merge") {
        return {
          filePath: `${currentDir}/node_modules/it-merge/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-parallel") {
        return {
          filePath: `${currentDir}/node_modules/it-parallel/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-parallel-batch") {
        return {
          filePath: `${currentDir}/node_modules/it-parallel-batch/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-peekable") {
        return {
          filePath: `${currentDir}/node_modules/it-peekable/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-pipe") {
        return {
          filePath: `${currentDir}/node_modules/it-pipe/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-pushable") {
        return {
          filePath: `${currentDir}/node_modules/it-pushable/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "it-take") {
        return {
          filePath: `${currentDir}/node_modules/it-take/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "p-queue") {
        return {
          filePath: `${currentDir}/node_modules/p-queue/dist/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "progress-events") {
        return {
          filePath: `${currentDir}/node_modules/progress-events/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "protons-runtime") {
        return {
          filePath: `${currentDir}/node_modules/protons-runtime/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arraylist") {
        return {
          filePath: `${currentDir}/node_modules/uint8arraylist/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arrays") {
        return {
          filePath: `${currentDir}/node_modules/uint8arrays/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arrays/alloc") {
        return {
          filePath: `${currentDir}/node_modules/uint8arrays/dist/src/alloc.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arrays/concat") {
        return {
          filePath: `${currentDir}/node_modules/uint8arrays/dist/src/concat.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arrays/equals") {
        return {
          filePath: `${currentDir}/node_modules/uint8arrays/dist/src/equals.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arrays/from-string") {
        return {
          filePath: `${currentDir}/node_modules/uint8arrays/dist/src/from-string.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8arrays/to-string") {
        return {
          filePath: `${currentDir}/node_modules/uint8arrays/dist/src/to-string.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "uint8-varint") {
        return {
          filePath: `${currentDir}/node_modules/uint8-varint/dist/src/index.js`,
          type: "sourceFile",
        };
      }
      if (moduleName === "@noble/ciphers/chacha") {
        return {
          filePath: `${currentDir}/node_modules/@noble/ciphers/esm/chacha.js`,
          type: "sourceFile",
        };
      }

      //* reference: NOOP a package
      // if (moduleName === 'package') {
      //   return { type: 'empty' };
      // }

      //* reference: manually resolve submodules
      // if (context.originModulePath.search("ipfs-unixfs-importer")) {
      //   if (moduleName === "hamt-sharding") {
      //     return {
      //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/hamt-sharding/dist/src/index.js`,
      //       type: "sourceFile",
      //     };
      //   }
      //   if (moduleName === "ipfs-unixfs") {
      //     return {
      //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/dist/src/index.js`,
      //       type: "sourceFile",
      //     };
      //   }
      // }
      // fallback to the default resolver
      const multiformats = multiformatsResolver(context, moduleName, platform);
      if (multiformats) return multiformats;

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

const multiformatsResolver = (context, moduleName, platform) => {
  // console.log(currentDir);
  // if (context.originModulePath.includes("@decentralized-identity/ion-sdk")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@decentralized-identity/ion-sdk/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("@ipld/dag-cbor")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@ipld/dag-cbor/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("@tbd54566975/dwn-sdk-js")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/@tbd54566975/dwn-sdk-js/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("blockstore-core")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/blockstore-core/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("interface-blockstore")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/interface-blockstore/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("ipfs-unixfs-exporter")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-exporter/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("ipfs-unixfs-importer")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // if (context.originModulePath.includes("uint8arrays")) {
  //   if (moduleName === 'multiformats') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/index.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/basics') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/basics.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base32') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/bases/base32.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base58') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/bases/base58.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/bases/base64') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/bases/base64.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/block') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/block.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/cid') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/cid.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/codecs/raw') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/codecs/raw.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/digest') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/hashes/digest.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/hasher') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/hashes/hasher.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/identity') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/hashes/identity.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  //   if (moduleName === 'multiformats/hashes/sha2') {
  //     return {
  //       filePath: `${currentDir}/node_modules/uint8arrays/node_modules/multiformats/src/hashes/sha2.js`,
  //       type: 'sourceFile',
  //     };
  //   }
  // }

  // handle root directory multiformats
  if (moduleName === "multiformats") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/index.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/basics") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/basics.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/bases/base32") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/bases/base32.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/bases/base58") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/bases/base58.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/bases/base64") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/bases/base64.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/block") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/block.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/cid") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/cid.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/codecs/raw") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/codecs/raw.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/digest") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/hashes/digest.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/hasher") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/hashes/hasher.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/identity") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/hashes/identity.js`,
      type: "sourceFile",
    };
  }
  if (moduleName === "multiformats/hashes/sha2") {
    return {
      filePath: `${currentDir}/node_modules/multiformats/dist/src/hashes/sha2.js`,
      type: "sourceFile",
    };
  }

  // return null if none found
  return null;
};

module.exports = config;
