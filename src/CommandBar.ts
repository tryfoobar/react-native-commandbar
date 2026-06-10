import { NativeModules, Platform } from 'react-native';
import type { ResourceCenterView } from './ResourceCenterView.tsx';

/** End user identity passed to `engagement.boot({ user, ... })`. */
export type CommandBarUser = {
  userId?: string;
  deviceId?: string;
};

export type CommandBarOptions = {
  /** Amplitude project API key. Routes to `engagement.init(apiKey, ...)`. */
  apiKey: string;
  /**
   * End user identity. Routes to `engagement.boot({ user, ... })`.
   * If omitted, the WebView generates a session-scoped anonymous `device_id`.
   */
  user?: CommandBarUser;
  /** Flat shorthand for `user: { userId }`. Ignored if `user` is set. */
  userId?: string;
  /** Amplitude data residency. Routes to `engagement.init` `serverZone`. */
  serverZone?: 'US' | 'EU' | 'local';
  /** Override Amplitude server endpoint. Routes to `engagement.init` `serverUrl`. */
  serverUrl?: string;
  /** Override CDN base. Used for both the bootstrap script URL and `engagement.init` `cdnUrl`. */
  cdnUrl?: string;
  /** Override the Assistant chat endpoint. Routes to `engagement.init` `chatUrl`. */
  chatUrl?: string;
  /** Override the media (image/video) endpoint. Routes to `engagement.init` `mediaUrl`. */
  mediaUrl?: string;
  /** Localization locale (e.g. `"en-US"`). Routes to `engagement.init` `locale`. */
  locale?: string;
  /** CSS color used by the loading spinner shown while the WebView boots Engagement. */
  spinnerColor?: string;
};

/** Tag filter for Assistant / Resource Center content (matches web `TagFilter`). */
export type TagFilter =
  | { tags: string[] }
  | { and: TagFilter[] }
  | { or: TagFilter[] };

// Define type for the LINKING_ERROR constant
const LINKING_ERROR: string =
  `The package '@commandbar/react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type NativeCommandBarModule = {
  boot(options: CommandBarOptions): void;
  openResourceCenter(
    articleId: number,
    onFallbackAction: (action: unknown) => void
  ): void;
  openAssistant(onFallbackAction: (action: unknown) => void): void;
  closeResourceCenter(): void;
  setAssistantFilter(filter: TagFilter | null): void;
  setResourceCenterFilter(filter: TagFilter | null): void;
};

export type RNCommandBar = {
  /**
   * Stores configuration used by every subsequent `openResourceCenter` / `openAssistant` call.
   * Call once at app start; safe to call again to swap options (e.g. after the user signs in).
   */
  boot(options: CommandBarOptions): void;
  openResourceCenter(
    articleId?: number,
    onFallbackAction?: (action: unknown) => void
  ): void;
  openAssistant(onFallbackAction?: (action: unknown) => void): void;
  /**
   * Dismisses the Resource Center / Assistant bottom sheet if it's currently open.
   * No-op when nothing is presented. Safe to call from any thread.
   */
  closeResourceCenter(): void;
  /** Mirrors `window.engagement.assistant.setAssistantFilter`. Pass `null` to clear. */
  setAssistantFilter(filter: TagFilter | null): void;
  /** Mirrors `window.engagement.setResourceCenterFilter`. Pass `null` to clear. */
  setResourceCenterFilter(filter: TagFilter | null): void;
  ResourceCenterView: typeof ResourceCenterView;
};

export const RNCommandBar = {
  boot: (options: CommandBarOptions) => {
    _RNCommandBar.boot(options);
  },
  openResourceCenter: (
    articleId?: number,
    onFallbackAction?: (action: unknown) => void
  ) => {
    _RNCommandBar.openResourceCenter(
      articleId ?? -1,
      onFallbackAction ?? (() => {})
    );
  },
  openAssistant: (onFallbackAction?: (action: unknown) => void) => {
    _RNCommandBar.openAssistant(onFallbackAction ?? (() => {}));
  },
  closeResourceCenter: () => {
    _RNCommandBar.closeResourceCenter();
  },
  setAssistantFilter: (filter: TagFilter | null) => {
    _RNCommandBar.setAssistantFilter(filter);
  },
  setResourceCenterFilter: (filter: TagFilter | null) => {
    _RNCommandBar.setResourceCenterFilter(filter);
  },
};

const _RNCommandBar: NativeCommandBarModule = NativeModules.RNCommandBar
  ? NativeModules.RNCommandBar
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const RNCommandBarEventEmitter = NativeModules.RNCommandBarEventEmitter
  ? NativeModules.RNCommandBarEventEmitter
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
