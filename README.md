<img src="docs/img/CommandBar.png" alt="CommandBar Logo" width="200" height="200">

# React Native CommandBar

[![CI](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml/badge.svg)](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml)

Copilot & HelpHub in React Native

## About

React Native CommandBar was built as a wrapper around [CommandBarIOS](https://github.com/tryfoobar/CommandBarIOS) and [CommandBarAndroid](https://github.com/tryfoobar/CommandBarAndroid) repos and uses both as dependencies.

## Installation

```sh
yarn add react-native-commandbar
```

```sh
npm install react-native-commandbar
```

## Usage

## Run the Example App

1. Clone the repo: `git clone https://github.com/tryfoobar/react-native-commandbar && cd react-native-commandbar`
2. Install dependencies: `yarn`
3. Run the example: `yarn example ios` or `yarn example android`

### Open HelpHub Bottom Sheet

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from 'react-native-commandbar';

const MyComponent = () => {
  return (
    <View>
      <Button
        title="Open"
        onPress={() => CommandBar.openHelpHub({ orgId: 'your_org_id' })}
      />
    </View>
  );
};
```

### Render a HelpHub View

```jsx
import { Button, View } from 'react-native';

const MyComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <HelpHubView orgId="your_org_id" />
    </View>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
