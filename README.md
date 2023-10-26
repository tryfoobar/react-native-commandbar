<img src="docs/img/CommandBar.png" alt="Image Name" width="200" height="200">

# React Native CommandBar

Copilot & HelpHub in React Native

## About

React Native CommandBar was built as a wrapper around [CommandBarIOS](https://github.com/tryfoobar/CommandBarAndroid) and [CommandBarIOS](https://github.com/tryfoobar/CommandBarAndroid) repos and uses both as dependencies.

## Installation

```sh
yarn add react-native-commandbar
```

```sh
npm install react-native-commandbar
```

## Usage

### Setup

```
// TODO: Add an example for configuring orgId
```

### Open HelpHub Bottom Sheet

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from 'react-native-commandbar';

const MyComponent = () => {
  return (
    <View>
      <Button title="Open" onPress={() => CommandBar.openHelpHub()} />
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
      <HelpHubView />
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
