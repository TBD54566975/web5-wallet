# expo-level

`abstract-level` adapter for `react-native-leveldb`

## Installation

```sh
npm install expo-level
```

### Install expo

Because the project use [expo-file-system](https://www.npmjs.com/package/expo-file-system), you also need configure Expo if you use this in a bare React Native Projects.

See: https://www.npmjs.com/package/expo-file-system

### Polyfill

The project requires some polyfill, either. You need to configure manually:

** `TextEncoder` object**

You need to manually setup a polyfill for `TextEncoder`. There are multiple ways to do this, one of the way is:

```bash
npm install react-native-polyfill-globals
```

And then include this in your project:

```js
import 'react-native-polyfill-globals/auto'
```

** Nodejs library **

Include this in your project:

> You may need install `buffer@6` first

```ts
if (!global.process.cwd) {
  global.process.cwd = () => {
    return '.';
  }
}
if (!(global as any).__dirname) {
  (global as any).__dirname = '.';
}
if (!(global as any).Buffer) {
  global.Buffer = require('buffer').Buffer;
}
```

## Usage

```js
import {SKReactNativeLevel} from "expo-level";

const db = new SKReactNativeLevel("test", {/* options */})

// ...
```

## Issues

Passes nearly all tests of `abstract-level` except for "async-iterator-test.js".

This issue may be due to the metro bundler, see

- https://github.com/facebook/metro/commit/bf73ed3aa7fec15f1394fd492450163b62b6267a

To run tests, start up the testapp app and click "Start Test".

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Thanks To

- [react-native-leveldb](https://github.com/greentriangle/react-native-leveldb)
- [react-native-leveldb-level-adapter](https://github.com/swittk/react-native-leveldb-level-adapter)

## License

MIT
