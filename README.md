<img src="docs/img/CommandBar.png" alt="CommandBar Logo" width="200" height="200">

# React Native CommandBar

[![CI](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml/badge.svg)](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml)

Assistant & Resource Center in React Native

## About

React Native CommandBar was built as a wrapper around [CommandBarIOS](https://github.com/tryfoobar/CommandBarIOS) and [CommandBarAndroid](https://github.com/tryfoobar/CommandBarAndroid) repos and uses both as dependencies.

The Help Hub WebView loads the standalone Amplitude Guides & Surveys script (`*.engagement.js`), then `init` + `boot`. Pass your Amplitude **project API key** as `orgId` in `CommandBarOptions`. Optional `serverZone`: `'US'` (default) or `'EU'`.

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

### Open Resource Center Bottom Sheet

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from '@commandbar/react-native';

const MyComponent = () => {
  return (
    <View>
      <Button
        title="Open"
        onPress={() => CommandBar.openResourceCenter({ orgId: 'your_org_id' })}
      />
    </View>
  );
};
```

### Open Resource Center Bottom Sheet to a specific Article

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from '@commandbar/react-native';

const MyComponent = () => {
  return (
    <View>
      <Button
        title="Open Support Article"
        onPress={() => CommandBar.openResourceCenter({ orgId: 'your_org_id' }, 123456)}
      />
    </View>
  );
};
```

### Tag filters

Set filters before or after opening the sheet. Latest values apply on each WebView load and immediately when the sheet is open.

```tsx
import { CommandBar } from '@commandbar/react-native';

CommandBar.setAssistantFilter({ tags: ['[Zendesk] mobile'] });

CommandBar.setResourceCenterFilter({
  and: [
    { tags: ['[Zendesk] mobile'] },
    { or: [{ tags: ['[Zendesk] v2'] }, { tags: ['[Zendesk] v3'] }] },
  ],
});

CommandBar.setAssistantFilter(null);
CommandBar.setResourceCenterFilter(null);
```

### Render a Resource Center View

```jsx
import { Button, View } from 'react-native';

const MyComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <ResourceCenterView orgId="your_org_id" />
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
