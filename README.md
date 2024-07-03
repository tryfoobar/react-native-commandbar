<img src="docs/img/CommandBar.png" alt="CommandBar Logo" width="200" height="200">

# React Native CommandBar

[![CI](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml/badge.svg)](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml)

Copilot & HelpHub in React Native

## About

React Native CommandBar was built as a wrapper around [CommandBarIOS](https://github.com/tryfoobar/CommandBarIOS) and [CommandBarAndroid](https://github.com/tryfoobar/CommandBarAndroid) repos and uses both as dependencies.

## Installation

**Minimum iOS Version:** 13.0
**Minimum Android Version:** 28

```sh
yarn add @commandbar/react-native
```

```sh
npm install @commandbar/react-native
```

## Usage

## Run the Example App

1. Clone the repo: `git clone https://github.com/tryfoobar/react-native-commandbar && cd react-native-commandbar`
2. Install dependencies: `yarn`
3. Run the example: `yarn example ios` or `yarn example android`

### Open HelpHub Bottom Sheet

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from '@commandbar/react-native';

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

### Open HelpHub Bottom Sheet to a specific Article

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from '@commandbar/react-native';

const MyComponent = () => {
  return (
    <View>
      <Button
        title="Open Support Article"
        onPress={() => CommandBar.openHelpHub({ orgId: 'your_org_id' }, 123456)}
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
