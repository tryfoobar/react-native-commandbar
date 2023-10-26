import type { ViewStyle } from 'react-native';
import { NativeModules, Platform, requireNativeComponent } from 'react-native';

// Define type for the LINKING_ERROR constant
const LINKING_ERROR: string =
  `The package 'react-native-commandbar' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type RNCommandBar = {
  openHelpHub(orgId: string): Promise<void>;
  HelpHubView: React.ComponentClass<HelpHubViewProps>;
};

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

export type HelpHubViewProps = {
  orgId: string;
  style?: ViewStyle;
};

export const HelpHubView: React.ComponentClass<HelpHubViewProps> =
  requireNativeComponent('HelpHubView');

export const CommandBar: RNCommandBar = {
  ...RNCommandBar,
  HelpHubView: HelpHubView,
};

export default CommandBar as RNCommandBar;
