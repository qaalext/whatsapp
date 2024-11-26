const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.cjs` files for FireBase databases
  'cjs'
);

module.exports = config;
