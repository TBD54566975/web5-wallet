# Web5 Wallet

Built with React Native and Expo

# Application Setup

Note that most things are not installed using Homewbrew. Homebrew is nice for personal projects but doesn't scale well for teams.

- nvm (installed without brew)
- rvm (installed without brew)
- ruby-2.7.4 installed inside of rvm and selected
- node v16.18.0 installed inside of nvm and selected
- npm v9.4.2 installed inside of node v16.18.0 and selected
- yarn v1.22.19 (installed without brew)
- watchman (via homebrew)

## Troubleshooting Setup

- `which yarn` should be `/Users/{USER}/.yarn/bin/yarn`

- `which rvm` should be `/Users/{USER}/.rvm/bin/rvm`

- `which node` should be `/Users/{USER}/.nvm/versions/node/v16.18.0/bin/node`

- `which npm` should be `/Users/{USER}/.nvm/versions/node/v16.18.0/bin/npm`

- `nvm list` should include `->     v16.18.0`

- `rvm list` should include `=* ruby-2.7.4 [ arm64 ]`

## Further troubleshooting

- Run `npx expo-env-info@latest`

# SSI SDK Development Setup

While this app is in initial development it is expected that [ssi-sdk-mobile.git](https://github.com/TBD54566975/ssi-sdk-mobile) is cloned as a sibling next to web5wallet. This allows rapid iteration and development of both this app and the SSI SDK without publishing versions.

Your folder structure should look like this:

```
./ssi-sdk-mobile/
./wallet/
```

For active development on `ssi-sdk-mobile` consult the docs of `ssi-sdk-mobile`. This app will use whatever branch or tag you've currently checked out from `ssi-sdk-mobile`.

# Dependencies

| Package                           | Description                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| @craftzdog/react-native-buffer    | Buffer is used for crypto in Node.js. Polyfill polyfilled using native C++  |
| react-native-quick-base64         | Base64 atoa/btoa is used for crypto in Node.js. Polyfilled using native C++ |
| react-native-bignumber            | Also known as bn.js used for crypto in Node.js. Polyfilled using native C++ |
| react-native-quick-crypto         | The `crpyto` module from Node.js. Polyfilled using native C++               |
| fastestsmallesttextencoderdecoder | The `TextEnder` & `TextDecoder` module from Node.js. Polyfilled with JS     |
| stream-browserify                 | The `stream` module from Node.js. Polyfilled with JS                        |
| react-native-webview-crypto       | Borrows the implementation of WebCrypto from a webview. Polyfills WebCrypto |
| react-native-webview              | Allows to spin up a WKWebWebview (and Android equivalent) for react native  |
| react-native-safe-area-context    | Used to provide safe area dimensions at top and bottom of screen            |
| @decentralized-identity/ion-tools | Provides `did:ion` support using Javascript                                 |
| @react-navigation/native          | Provides navigation (concepts of screens and animations) for rn             |
| @react-navigation/native-stack    | Makes react-navigation use native UI                                        |
| react-native-screens              | Makes react-navigation use native UI                                        |
| react-native-paper                | Provides nice looking UI for easy prototyping                               |

# Considerations

- Three packages are polyfilled using JS rather than native. C++ polyfills could be created for higher performance.
- `did:ion` relies on WebCrypto because of the way `ion-tools` is written. Is there an implementation of `did:ion` that instead relies on Node crypto? Should we write one?
