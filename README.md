# Web5 Wallet

Built with React Native and Expo

# Application Setup

Note that most things are not installed using Homewbrew. Homebrew is nice for personal projects but doesn't scale well for teams.

- nvm (installed not using homebrew)
- rvm (installed not using homebrew)
- ruby-3.2.2 installed inside of rvm and selected
- node v18.16.0 installed inside of nvm and selected
- npm v9.x.x installed inside of node v18.16.0 and selected
- yarn v1.x.x (installed into the node version via corepack)
- watchman (via homebrew)

1. Install nvm (if you don't have it)
2. Install Node v18.16.0 into nvm, select it, and make it the default selected node version if helpful
3. Run `corepack enable` (if necessary) 
4. Run `yarn install` to install node modules
5. Install rvm (if you don't have it)
6. Install ruby-3.2.2 into rvm, select it, and make it default if helpful
7. `cd ios` and bundle install
8. `cd android` and bundle install
9. In the root folder run `yarn pods` to install pods
10. Install XCode with the latest SDK if necessary
11. Install Android Studio with the latest SDK if necessary

The project should now be ready to run. 

To Run iOS: Inside the `ios` folder, open the .xcworkspace and run the build. 
To Run Android: Open the `android` folder in Android Studio and run the build.

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

- `rvm list` should include `=* ruby-3.2.2 [ arm64 ]`

## Further troubleshooting install

- Run `npx expo-env-info@latest`
