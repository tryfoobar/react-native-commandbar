<img src="docs/img/CommandBar.png" alt="CommandBar Logo" width="200" height="200"> <img src="https://www.freelogovectors.net/wp-content/uploads/2023/11/amplitude_logo-freelogovectors.net_.png" alt="Amplitude Logo" width="260" height="200">

# React Native CommandBar

[![CI](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml/badge.svg)](https://github.com/tryfoobar/react-native-commandbar/actions/workflows/ci.yml)

Assistant & Resource Center in React Native

> [!WARNING]
> CommandBar is now part of [Amplitude](https://amplitude.com). This repository has been updated to help existing CommandBar customers migrate to **Amplitude Resource Center & Assistant**, but it should be treated as **deprecated** and will not receive updates.
> For those migrating from CommandBar/CommandAI, please see our [migration guide](./MIGRATING.md)


## About

React Native CommandBar was built as a wrapper around [CommandBarIOS](https://github.com/tryfoobar/CommandBarIOS) and [CommandBarAndroid](https://github.com/tryfoobar/CommandBarAndroid) repos and uses both as dependencies.

The Help Hub WebView loads the standalone Amplitude Guides & Surveys script (`*.engagement.js`), then `init` + `boot`. Pass your Amplitude **project API key** as `apiKey` in `CommandBarOptions`.

Available `CommandBarOptions` fields (all but `apiKey` are optional):

- `apiKey`: Amplitude project API key (required)
- `user`: `{ userId?, deviceId? }` — passed to `engagement.boot`
- `userId`: flat shorthand for `user: { userId }`
- `serverZone`: `'US'` (default), `'EU'`, or `'local'`
- `serverUrl`, `cdnUrl`, `chatUrl`, `mediaUrl`, `locale`: forwarded to `engagement.init`
- `spinnerColor`: CSS color for the loading spinner
- `fontFamilies`: `string[]` of Google Font families to preload (e.g. `['Roboto']`) — see [Custom theme fonts](#custom-theme-fonts)

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

### Boot the SDK

Boot once at app start. The booted options are reused by every subsequent `openResourceCenter` / `openAssistant` call.

```tsx
import { useEffect } from 'react';
import { CommandBar } from '@commandbar/react-native';

export default function App() {
  useEffect(() => {
    CommandBar.boot({ apiKey: 'your_api_key' });
  }, []);

  // ...
}
```

Call `CommandBar.boot(...)` again at any time to swap options (e.g. after the user signs in).

### Open Resource Center Bottom Sheet

```jsx
import { Button, View } from 'react-native';
import { CommandBar } from '@commandbar/react-native';

const MyComponent = () => {
  return (
    <View>
      <Button title="Open" onPress={() => CommandBar.openResourceCenter()} />
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
        onPress={() => CommandBar.openResourceCenter(123456)}
      />
    </View>
  );
};
```

### Close the Sheet Programmatically

Both methods dismiss whichever engagement sheet (Resource Center or Assistant) is
currently presented — they're aliases provided for API symmetry with `open*`.
Both are no-ops when nothing is presented.

```tsx
import { CommandBar } from '@commandbar/react-native';

CommandBar.closeResourceCenter();
CommandBar.closeAssistant();
```

A common pattern is dismissing from a fallback action callback:

```tsx
CommandBar.openAssistant((action) => {
  console.log('Fallback triggered:', action);
  CommandBar.closeAssistant();
});
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

### Custom theme fonts

The Resource Center / Assistant render inside a WebView that has no host page, so a theme
that uses a non-system (Google) font only renders correctly if that font is fetched inside
the WebView. Pass the font family names your Engagement theme uses via `fontFamilies` to ensure they're preloaded

```tsx
import { CommandBar } from '@commandbar/react-native';

CommandBar.boot({
  apiKey: 'your_api_key',
  fontFamilies: ['Roboto'], // any Google Font(s) your theme uses
});
```

If omitted, the WebView still attempts to auto-detect and load the theme's font at runtime.

### Render a Resource Center View

```jsx
import { Button, View } from 'react-native';

const MyComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <ResourceCenterView options={{ apiKey: 'your_api_key' }} />
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
