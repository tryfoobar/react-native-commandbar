import { NativeModules, Platform } from 'react-native';
import type { HelpHubView } from './HelpHubView.tsx';

export type CommandBarOptions = {
  /** Amplitude project API key (Guides & Surveys / Engagement). */
  orgId: string;
  userId?: string;
  spinnerColor?: string;
  launchCode?: string;
  /** Amplitude data residency: `"US"` (default) or `"EU"`. */
  serverZone?: 'US' | 'EU';
};

// Define type for the LINKING_ERROR constant
const LINKING_ERROR: string =
  `The package '@commandbar/react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export type RNCommandBar = {
  openResourceCenter(
    options: CommandBarOptions,
    articleId?: number,
    onFallbackAction?: (action: any) => void
  ): void;
  openAssistant(
    options: CommandBarOptions,
    onFallbackAction?: (action: any) => void
  ): void;
  HelpHubView: typeof HelpHubView;
};

export const RNCommandBar = {
  openResourceCenter: (
    options: CommandBarOptions,
    articleId?: number,
    onFallbackAction?: (action: any) => void
  ) => {
    _RNCommandBar.openResourceCenter(
      options,
      articleId ?? -1,
      onFallbackAction ?? (() => {})
    );
  },
  openAssistant: (
    options: CommandBarOptions,
    onFallbackAction?: (action: any) => void
  ) => {
    _RNCommandBar.openAssistant(options, onFallbackAction ?? (() => {}));
  },
};

const _RNCommandBar = NativeModules.RNCommandBar
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
