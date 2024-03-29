import { HelpHubView } from './HelpHubView';
import { NativeRNCommandBar } from './CommandBar';
import type { RNCommandBar } from './CommandBar';

export * from './HelpHubView';

const CommandBar = {
  ...NativeRNCommandBar,
  HelpHubView: HelpHubView,
} as RNCommandBar;

export default CommandBar;
