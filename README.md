# Web5 Wallet

Built with React Native and Expo

# Application Setup

Note that most things are not installed using Homewbrew. Homebrew is nice for personal projects but doesn't scale well for teams.

Prerequisites:
- nvm (installed not using homebrew)
- rvm (installed not using homebrew)
- using rvm, install ruby-3.2.2 and select it
- using nvm, install node v20.9.0 and select it
- `corepack enable` turned on
- watchman (`brew install watchman`)

Install steps:
1. Install nvm (if you don't have it)
2. Install Node v20.9.0 into nvm, select it, and if helpful to you make it the default version
3. Run `corepack enable` (if necessary to turn on corepack for this node version if you haven't already turned it on) 
4. Run `corepack install` to install `yarn` pkg manager
5. Run `yarn` to install `node_modules`
6. Install rvm (if you don't have it)
7. Install ruby-3.2.2 into rvm, select it, and if helpful to you make it the default version
8. `cd ios` and bundle install
9. `cd android` and bundle install
10. In the root folder run `yarn pods` to install pods
11. Install XCode with the latest SDK if necessary
12. Install Android Studio with the latest SDK if necessary

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

- `which node` should be `/Users/{USER}/.nvm/versions/node/v20.9.0/bin/node`

- `which npm` should be `/Users/{USER}/.nvm/versions/node/v20.9.0/bin/npm`

- `nvm list` should include `->     v20.9.0`

- `rvm list` should include `=* ruby-3.2.2 [ arm64 ]`

## Further troubleshooting install

- Run `npx expo-env-info@latest` and send that info to a maintainer or post it in an issue
