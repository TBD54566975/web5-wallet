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
