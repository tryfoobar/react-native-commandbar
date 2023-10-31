import { NativeModules, Platform } from 'react-native';
import { HelpHubView } from './HelpHubView';
import type { CommandBarOptions } from './CommandBar';

// Define type for the LINKING_ERROR constant
const LINKING_ERROR: string =
  `The package 'react-native-commandbar' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RNCommandBar = NativeModules.RNCommandBar
  ? NativeModules.RNCommandBar
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type RNCommandBar = {
  openHelpHub(
    options: CommandBarOptions,
    onFallbackAction?: (action: any) => void
  ): void;
  HelpHubView: typeof HelpHubView;
};

export * from './HelpHubView';

export const CommandBar: RNCommandBar = {
  ...RNCommandBar,
  HelpHubView: HelpHubView,
};

export default CommandBar as RNCommandBar;
