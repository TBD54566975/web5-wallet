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

## Using the debugger

The application can be debugged through VSCode

1. Download the Expo Tools VSCode Extension.
2. Use the "Run and Debug" menu in VSCode to run the script "Debug Expo App."
3. Fire up a simulator so that the session attaches to the debugger.
4. Set your breakpoints as needed.

   > Caution: Reused breakpoints don't work. Make sure to clear breakpoints in between sessions.

## Troubleshooting install

- `which yarn` should be `/Users/{USER}/.yarn/bin/yarn`

- `which rvm` should be `/Users/{USER}/.rvm/bin/rvm`

- `which node` should be `/Users/{USER}/.nvm/versions/node/v18.16.0/bin/node`

- `which npm` should be `/Users/{USER}/.nvm/versions/node/v18.16.0/bin/npm`

- `nvm list` should include `->     v18.16.0`

- `rvm list` should include `=* ruby-2.7.4 [ arm64 ]`

## Further troubleshooting install

- Run `npx expo-env-info@latest`
