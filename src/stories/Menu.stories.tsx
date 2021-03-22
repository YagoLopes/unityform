import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Menu } from '../components';
import { IMenuProps } from '../components/Menu';
import { Dashboard } from '@material-ui/icons';

export default {
  title: 'Example/Menu',
  component: Menu,
} as Meta;

const Template: Story<IMenuProps> = args => <Menu {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Menu',
  name: 'name',
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ],
  Icon: Dashboard,
  tooltip: 'Olá mundo',
  onSelect: () => console.log('submit'),
};
