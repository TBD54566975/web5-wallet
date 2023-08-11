// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("metro-config");

const config = getDefaultConfig(__dirname);
const web5Config = require("@tbd54566975/web5-react-native-metro-config");
const currentDir = process.cwd();
const customConfig = {
  ...config,
  resolver: {
    sourceExts: ["ts", "tsx", "js", "jsx", "json", "cjs", "mjs"],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === "@decentralized-identity/ion-tools") {
        return {
          // @tbd54566975/web5-react-native-metro-config references @decentralized-identity/ion-tools/dist/esm/index.js but the correct path is @decentralized-identity/ion-tools/dist/esm/src/index.js
          filePath: `${currentDir}/node_modules/@decentralized-identity/ion-tools/dist/esm/src/index.js`,
          type: "sourceFile",
        };
      }

      if (moduleName === "@tbd54566975/web5") {
        return {
          filePath: `${currentDir}/node_modules/@tbd54566975/web5/dist/esm/main.mjs`,
          type: "sourceFile",
        };
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};
config.resolver.sourceExts.push("mjs");

module.exports = mergeConfig(customConfig, web5Config);
