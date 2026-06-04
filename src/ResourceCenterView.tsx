import React, { useEffect } from 'react';
import {
  DeviceEventEmitter,
  requireNativeComponent,
  NativeEventEmitter,
  Platform,
} from 'react-native';
import type { CommandBarOptions } from './CommandBar';
import type { ViewStyle } from 'react-native';
import { RNCommandBarEventEmitter } from './CommandBar';

export type ResourceCenterViewProps = {
  options: CommandBarOptions;
  onFallbackAction?: (action: any) => void;
  style?: ViewStyle;
};

const EventEmitter =
  Platform.OS === 'ios'
    ? new NativeEventEmitter(RNCommandBarEventEmitter)
    : DeviceEventEmitter;

export const ResourceCenterViewNative: React.ComponentClass<ResourceCenterViewProps> =
  requireNativeComponent('ResourceCenterView');

export const ResourceCenterView: React.FC<ResourceCenterViewProps> = (props) => {
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

  return <ResourceCenterViewNative options={props.options} style={props.style} />;
};
