/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { mergeConfig } = require("metro-config");
const web5Config = require("@tbd54566975/web5-react-native-metro-config");

const merged = mergeConfig(config, web5Config);

const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withWeb5Monorepo = (config) => {
  const projectRoot = __dirname;
  const monorepoRoot = path.resolve(projectRoot, "../web5-js/");

  config.watchFolders = [path.resolve(projectRoot, "../web5-js/")];
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
  ];

  return config;
};

module.exports = withWeb5Monorepo(merged);
// module.exports = merged;
