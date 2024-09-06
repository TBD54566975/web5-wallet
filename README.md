# Web5 Wallet

Built with React Native and Expo

# Application Setup

Note that most things are not installed using Homewbrew. Homebrew is nice for personal projects but doesn't scale well for teams.

Installation prerequisites:
- `nvm` (Node Version Manager) - install NOT using `homebrew`:

  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`

  Change the version in the command above to latest `nvm` version as needed.

- `rvm` (Ruby Version Manager) - install NOT using `homebrew`:

  `\curl -sSL https://get.rvm.io | bash -s stable`

- `node` v20.9.0 and select it - install using `nvm`:

  `nvm install 20.9.0`

  `nvm use 20.9.0` - installing should already switch to the desired version, but run this if `node -v` shows a wrong version

- `ruby` v3.2.2 and select it - install using `rvm`:

  `rvm install 3.2.2`

  `rvm use 3.2.2` - installing should already switch to the desired version, but run this if `ruby -v` shows a wrong version

  Note, `ruby` installation requires openSSL v1, if you have openSSL v3 installed, you might need to override with explicit reference to openSSL v1 directory if you installation fails on openSSL. e.g.

  `rvm install 3.2.2 --with-openssl-dir=$(brew --prefix openssl@1.1)`

- `watchman`

  `brew install watchman`

Installation steps:
1. Run `corepack enable` to turn on `corepack` for this node version if you haven't already turned it on.

1. Run `corepack install` to install `yarn` pkg manager

1. Run `yarn` to install `node_modules`

   Note, if you encounter the following error:

   ```
   "Internal Error: Error when performing the request to https://registry.npmjs.org/yarn;
   ```

   Check to see if you are running a VPN that blocks this URL, if so, disable the VPN and try again.

1. From root repo directory, run:

   `cd ios` then `bundle install`

1. From root repo directory, run:

   `cd android` the `bundle install`

1. In the root repo directory run `yarn pods` to install CocoaPods

   Note: if you encounter the error below:

   ```
   [!] CocoaPods could not find compatible versions for pod "hermes-engine"
   ```

   You will need to run the following command to update `hermes-engine` version in `Podfile.lock` file in the `ios` directory as suggested in the full error message:

   `pod update hermes-engine --no-repo-update`

1. Install XCode with the latest SDK if necessary

1. Install Android Studio with the latest SDK if necessary

The project should now be ready to run. 

To Run iOS: Inside the `ios` folder, open the `.xcworkspace` and run the build (click the "play" button).

- Note: if you see the following error in a red box when emulator starts:

  ```
  No bundle URL present.

  Make sure you're running a packager server or have included a .jsbundle file in your application bundle.
  ```

  It means the Metro Bundler (JavaScript server that comes with React Native) is not running, you will need to start it manually then reload the app in the emulator:

  `npx react-native start`

To Run Android: Open the `android` folder in Android Studio and run the build.

## Debugging

The application can be debugged through VSCode

1. Download the Expo Tools VSCode Extension.
2. Use the "Run and Debug" menu in VSCode to run the script "Debug Expo App."
3. Fire up a simulator so that the session attaches to the debugger.
4. Set your breakpoints as needed.

   > Caution: Reused breakpoints don't work. Make sure to clear breakpoints in between sessions.

### Alternative Method

If you are having trouble getting the above method to work. Consider the [alternative method](https://reactnative.dev/docs/debugging?js-debugger=new-debugger#opening-the-debugger) below.

Start Metro Bundler with:

`npx react-native start --experimental-debugger`

Then you can launch the debugger by triggering the Dev Menu in the app (e.g. by pressing `d` in the Metro Bundler terminal) then choosing the "Open Debugger" option, this will launch the debugger in the browser.

## Troubleshooting install

- `which yarn` should be `/Users/{USER}/.yarn/bin/yarn`

- `which rvm` should be `/Users/{USER}/.rvm/bin/rvm`

- `which node` should be `/Users/{USER}/.nvm/versions/node/v20.9.0/bin/node`

- `which npm` should be `/Users/{USER}/.nvm/versions/node/v20.9.0/bin/npm`

- `nvm list` should include `->     v20.9.0`

- `rvm list` should include `=* ruby-3.2.2 [ arm64 ]`

## Further troubleshooting install

- Run `npx expo-env-info@latest` and send that info to a maintainer or post it in an issue
