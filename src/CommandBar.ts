import { NativeModules, Platform } from 'react-native';
import type { HelpHubView } from './HelpHubView.tsx';

export type CommandBarOptions = {
  orgId: string;
  userId?: string;
  spinnerColor?: string;
  launchCode?: string;
};

// Define type for the LINKING_ERROR constant
const LINKING_ERROR: string =
  `The package '@commandbar/react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export type RNCommandBar = {
  openHelpHub(
    options: CommandBarOptions,
    onFallbackAction?: (action: any) => void
  ): void;
  HelpHubView: typeof HelpHubView;
};

console.log(Object.keys(NativeModules));
export const RNCommandBar = NativeModules.RNCommandBar
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
