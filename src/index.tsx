import { ResourceCenterView } from './ResourceCenterView';
import { RNCommandBar } from './CommandBar';

export * from './ResourceCenterView';
export type { CommandBarOptions, TagFilter } from './CommandBar';

export const CommandBar: RNCommandBar = {
  ...RNCommandBar,
  ResourceCenterView: ResourceCenterView,
};

export default CommandBar as RNCommandBar;
