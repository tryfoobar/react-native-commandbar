import { NativeModules, Platform } from 'react-native';
import type { ResourceCenterView } from './ResourceCenterView.tsx';

export type CommandBarOptions = {
  /** Amplitude project API key (Guides & Surveys / Engagement). */
  orgId: string;
  userId?: string;
  spinnerColor?: string;
  launchCode?: string;
  /** Amplitude data residency: `"US"` (default) or `"EU"`. */
  serverZone?: 'US' | 'EU';
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
  openResourceCenter(
    options: CommandBarOptions,
    articleId: number,
    onFallbackAction: (action: unknown) => void
  ): void;
  openAssistant(
    options: CommandBarOptions,
    onFallbackAction: (action: unknown) => void
  ): void;
  setAssistantFilter(filter: TagFilter | null): void;
  setResourceCenterFilter(filter: TagFilter | null): void;
};

export type RNCommandBar = {
  openResourceCenter(
    options: CommandBarOptions,
    articleId?: number,
    onFallbackAction?: (action: unknown) => void
  ): void;
  openAssistant(
    options: CommandBarOptions,
    onFallbackAction?: (action: unknown) => void
  ): void;
  /** Mirrors `window.engagement.assistant.setAssistantFilter`. Pass `null` to clear. */
  setAssistantFilter(filter: TagFilter | null): void;
  /** Mirrors `window.engagement.setResourceCenterFilter`. Pass `null` to clear. */
  setResourceCenterFilter(filter: TagFilter | null): void;
  ResourceCenterView: typeof ResourceCenterView;
};

export const RNCommandBar = {
  openResourceCenter: (
    options: CommandBarOptions,
    articleId?: number,
    onFallbackAction?: (action: unknown) => void
  ) => {
    _RNCommandBar.openResourceCenter(
      options,
      articleId ?? -1,
      onFallbackAction ?? (() => {})
    );
  },
  openAssistant: (
    options: CommandBarOptions,
    onFallbackAction?: (action: unknown) => void
  ) => {
    _RNCommandBar.openAssistant(options, onFallbackAction ?? (() => {}));
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
