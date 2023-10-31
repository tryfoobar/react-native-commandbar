import React, { useEffect } from 'react';
import { DeviceEventEmitter, requireNativeComponent } from 'react-native';
import type { CommandBarOptions } from './CommandBar';
import type { ViewStyle } from 'react-native';

export type HelpHubViewProps = {
  options: CommandBarOptions;
  onFallbackAction?: (action: any) => void;
  style?: ViewStyle;
};

export const HelpHubViewNative: React.ComponentClass<HelpHubViewProps> =
  requireNativeComponent('HelpHubView');

export const HelpHubView: React.FC<HelpHubViewProps> = (props) => {
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'onFallbackAction',
      (action) => {
        props.onFallbackAction?.(action);
      }
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HelpHubViewNative options={props.options} style={props.style} />;
};
