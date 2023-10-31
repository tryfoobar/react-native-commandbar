import React, { useEffect } from 'react';
import {
  DeviceEventEmitter,
  requireNativeComponent,
  NativeEventEmitter,
  Platform,
} from 'react-native';
import type { CommandBarOptions } from './CommandBar';
import type { ViewStyle } from 'react-native';
import { RNEventEmitter } from './CommandBar';

export type HelpHubViewProps = {
  options: CommandBarOptions;
  onFallbackAction?: (action: any) => void;
  style?: ViewStyle;
};

const EventEmitter =
  Platform.OS === 'ios'
    ? new NativeEventEmitter(RNEventEmitter)
    : DeviceEventEmitter;

export const HelpHubViewNative: React.ComponentClass<HelpHubViewProps> =
  requireNativeComponent('HelpHubView');

export const HelpHubView: React.FC<HelpHubViewProps> = (props) => {
  useEffect(() => {
    const subscription = EventEmitter.addListener(
      'onFallbackAction',
      (action) => {
        props.onFallbackAction?.(action);
      }
    );

    return () => {
      subscription?.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HelpHubViewNative options={props.options} style={props.style} />;
};
