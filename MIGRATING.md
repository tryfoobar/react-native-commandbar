# Migrating from @commandbar/react-native 1.x to 2.0

`@commandbar/react-native` 2.0 is the **Amplitude Engagement** rewrite. The renderer is now a single WebView that loads `*.engagement.js`, configuration is set once via a new `CommandBar.boot(...)` call, and the option names are aligned with the web Engagement SDK (and with the new native CommandBarIOS / CommandBarAndroid 2.0 releases).

This is a **breaking** release. Every app on 1.x needs the changes below.

## TL;DR

| Area | 1.x (v1.0.4) | 2.0 |
| --- | --- | --- |
| Identifier | `orgId` (a CommandBar org id) | `apiKey` (your Amplitude project API key) |
| Configuration | passed to every `openHelpHub` call | passed once to `CommandBar.boot(...)` |
| Resource Center method | `openHelpHub(options, articleId?, onFallbackAction?)` | `openResourceCenter(articleId?, onFallbackAction?)` |
| Resource Center component | `HelpHubView` | `ResourceCenterView` |
| Assistant method | — *(not in 1.x)* | `openAssistant(onFallbackAction?)` *(new in 2.0)* |
| `launchCode` | shortcut for staging/local endpoints | removed — use explicit `serverUrl` / `cdnUrl` / `chatUrl` / `mediaUrl` / `locale` / `serverZone` |
| User shape | `userId` only | `userId` (flat) **or** `user: { userId, deviceId }` (nested) |
| New fields | — | `serverZone`, `serverUrl`, `cdnUrl`, `chatUrl`, `mediaUrl`, `locale` |

## 1. Boot once, instead of passing options on every call

The biggest API change: `CommandBar.boot(options)` stores the configuration. Subsequent `openResourceCenter` / `openAssistant` calls reuse it and take no options.

```diff
- import { CommandBar } from '@commandbar/react-native';
-
- const options = { orgId: 'YOUR_ORG_ID', userId: 'user-123' };
-
- <Button onPress={() => CommandBar.openHelpHub(options)} />
+ import { useEffect } from 'react';
+ import { CommandBar } from '@commandbar/react-native';
+
+ export default function App() {
+   useEffect(() => {
+     CommandBar.boot({ apiKey: 'YOUR_API_KEY', userId: 'user-123' });
+   }, []);
+
+   return (
+     <>
+       <Button onPress={() => CommandBar.openResourceCenter()} />
+       <Button onPress={() => CommandBar.openAssistant()} />
+     </>
+   );
+ }
```

Calls to `openResourceCenter` / `openAssistant` before `boot` are a no-op and log a warning on native. Call `boot` as early as possible (typically in your root component's `useEffect`).

## 2. Replace `orgId` with an Amplitude `apiKey`

CommandBar is now Amplitude Guides & Surveys. Get your project **API key** from the Amplitude dashboard and use it wherever you previously passed an org id.

```diff
- CommandBar.boot({ orgId: 'YOUR_ORG_ID' });
+ CommandBar.boot({ apiKey: 'YOUR_API_KEY' });
```

## 3. (Optional) Use the nested `user` form

For an explicit device id, use the new nested form. The flat `userId` shorthand still works.

```ts
// Flat (unchanged ergonomics)
CommandBar.boot({ apiKey: 'YOUR_API_KEY', userId: 'user-123' });

// Nested
CommandBar.boot({
  apiKey: 'YOUR_API_KEY',
  user: { userId: 'user-123', deviceId: 'device-abc' },
});
```

## 4. Replace `launchCode` with explicit URLs / `serverZone`

`launchCode` is gone. To target staging, EU, or a local server, set the corresponding fields directly — these map 1:1 to the web Engagement SDK's `SDKConfig`.

```diff
- CommandBar.boot({ orgId: 'YOUR_ORG_ID', launchCode: 'staging' });
+ CommandBar.boot({
+   apiKey: 'YOUR_API_KEY',
+   serverZone: 'EU',          // 'US' (default), 'EU', 'local'
+   serverUrl: 'https://...',  // optional explicit override
+   cdnUrl:    'https://...',
+   chatUrl:   'https://...',
+   mediaUrl:  'https://...',
+   locale:    'en-US',
+ });
```

## 5. Rename `openHelpHub` → `openResourceCenter` and `HelpHubView` → `ResourceCenterView`

The Resource Center surface was called HelpHub in 1.x. 2.0 renames both the imperative method and the component to match the web Engagement SDK and the 2.x native SDKs. Drop the first positional argument (`options`) at the same time — `articleId` and `onFallbackAction` keep their positions:

```diff
- CommandBar.openHelpHub(options, 123456, (action) => { /* ... */ });
+ CommandBar.openResourceCenter(123456, (action) => { /* ... */ });
```

```diff
- import { HelpHubView } from '@commandbar/react-native';
- <HelpHubView orgId="YOUR_ORG_ID" />
+ import { ResourceCenterView } from '@commandbar/react-native';
+ <ResourceCenterView />
```

`ResourceCenterView` reads its configuration from the most recent `CommandBar.boot(...)` call, so it no longer takes `orgId` / `userId` / `launchCode` props.

### `openAssistant` is new in 2.0

There was no Assistant method on `CommandBar` in any released 1.x version, so there's nothing to rename. If you want the Assistant in your app, add a new call site after `boot`:

```ts
CommandBar.openAssistant((action) => { /* ... */ });
```

## 6. (Optional) Re-call `boot` after sign-in

`CommandBar.boot(...)` is safe to call again at any time. A common pattern is to boot anonymously at app launch and re-boot once the user authenticates:

```ts
CommandBar.boot({ apiKey });
// ...later, after sign-in...
CommandBar.boot({ apiKey, userId: signedInUser.id });
```

## Native dependency notes

`@commandbar/react-native` 2.0 wraps **CommandBarIOS 2.x** and **CommandBarAndroid 2.x**. If you've pinned either native dep explicitly in your `Podfile` or `build.gradle`, bump them to the 2.x line at the same time.

## Reference

After migrating, the [README](./README.md) is the source of truth for the 2.0 API.
