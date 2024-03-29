import React from 'react';
import {
  DeviceEventEmitter,
  requireNativeComponent,
  NativeEventEmitter,
  Platform,
} from 'react-native';
import type { CommandBarOptions } from './CommandBar';
import type { ViewStyle } from 'react-native';
import { CommandBarRNEventEmitter } from './CommandBar';

export type HelpHubViewProps = {
  options: CommandBarOptions;
  onFallbackAction?: (action: any) => void;
  style?: ViewStyle;
};

const EventEmitter =
  Platform.OS === 'ios'
    ? new NativeEventEmitter(CommandBarRNEventEmitter)
    : DeviceEventEmitter;

const helpHubViewName = 'HelpHubView';

export const HelpHubViewNative:
  | React.ComponentClass<HelpHubViewProps>
  | (() => JSX.Element) = requireNativeComponent(helpHubViewName)
  ? requireNativeComponent(helpHubViewName)
  : () => {
      throw new Error(
        `The package '@commandbar/react-native' doesn't seem to be linked. Make sure: \n\n` +
          Platform.select({
            ios: "- You have run 'pod install'\n",
            default: '',
          }) +
          '- You rebuilt the app after installing the package\n' +
          '- You are not using Expo Go\n'
      );
    };

type CommandBarSubscriber = {
  remove: () => void;
} | null;

let subscription: CommandBarSubscriber;

export const HelpHubView: React.FC<HelpHubViewProps> = (
  props: HelpHubViewProps
) => {
  const { onFallbackAction, options, style } = props;

  React.useEffect(() => {
    if (!onFallbackAction) return;

    subscription = EventEmitter.addListener(
      'onFallbackAction',
      (action: () => void) => onFallbackAction?.(action)
    );

    return () => {
      subscription?.remove();
    };
  }, [onFallbackAction]);

  return <HelpHubViewNative options={options} style={style} />;
};
