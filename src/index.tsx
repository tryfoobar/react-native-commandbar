import { HelpHubView } from './HelpHubView';
import { RNCommandBar } from './CommandBar';

export * from './HelpHubView';

export const CommandBar: RNCommandBar = {
  ...RNCommandBar,
  HelpHubView: HelpHubView,
};

export default CommandBar as RNCommandBar;
