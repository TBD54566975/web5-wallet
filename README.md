# Web5 Wallet

Built with React Native and Expo

# Application Setup

Note that most things are not installed using Homewbrew. Homebrew is nice for personal projects but doesn't scale well for teams.

- nvm (installed without brew)
- rvm (installed without brew)
- ruby-2.7.4 installed inside of rvm and selected
- node v18.16.0 installed inside of nvm and selected
- npm v9.4.2 installed inside of node v18.16.0 and selected
- yarn v1.22.19 (installed without brew)
- watchman (via homebrew)

## Troubleshooting Setup

- `which yarn` should be `/Users/{USER}/.yarn/bin/yarn`

- `which rvm` should be `/Users/{USER}/.rvm/bin/rvm`

- `which node` should be `/Users/{USER}/.nvm/versions/node/v18.16.0/bin/node`

- `which npm` should be `/Users/{USER}/.nvm/versions/node/v18.16.0/bin/npm`

- `nvm list` should include `->     v18.16.0`

- `rvm list` should include `=* ruby-2.7.4 [ arm64 ]`

## Further troubleshooting

- Run `npx expo-env-info@latest`

# Dependencies

| Package                           | Description                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| @craftzdog/react-native-buffer    | The `Buffer` module from Node.js. Polyfilled using native C++                                             |
| react-native-quick-base64         | Base64 atoa/btoa used for crypto in Node.js. Polyfilled using native C++                                  |
| react-native-bignumber            | Also known as bn.js used for crypto in Node.js. Polyfilled using native C++                               |
| react-native-quick-crypto         | The `crypto` module from Node.js. Polyfilled using native C++                                             |
| fastestsmallesttextencoderdecoder | The `TextEnder` & `TextDecoder` module from Node.js. Polyfilled with JS                                   |
| stream-browserify                 | The `stream` module from Node.js. Polyfilled with JS                                                      |
| react-native-safe-area-context    | Used to provide safe area dimensions at top and bottom of screen                                          |
| @decentralized-identity/ion-tools | Provides `did:ion` support using Javascript                                                               |
| @react-navigation/native          | Provides navigation (concepts of screens and animations) for rn                                           |
| @react-navigation/native-stack    | Makes react-navigation use native UI                                                                      |
| react-native-screens              | Makes react-navigation use native UI                                                                      |
| react-native-paper                | Provides nice looking UI for easy prototyping                                                             |
| patch-package                     | Create patches of packages instead of forking (useful for monorepos not easily forked)                    |
| postinstall-postinstall           | Postinstall hook for Yarn v1                                                                              |
| react-native-mmkv                 | Localstorage key-value store, faster than SharedPreferences, UserDefaults or SQL                          |
| @legendapp/state                  | Proxy based atomic state management that implements Signals inside React. Similar to Valtio, Mobx, Jotai. |

# Considerations

- Three packages are polyfilled using JS rather than native. C++ polyfills could be created for higher performance.
