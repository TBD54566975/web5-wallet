# Web5 Wallet

Built with React Native and Expo

# Setup

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

### Further troubleshooting

- Run `npx expo-env-info@latest`
