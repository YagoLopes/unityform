import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Toggle } from '../components';
import { IToggleProps } from '../components/Toggle';

export default {
  title: 'Example/Toggle',
  component: Toggle,
} as Meta;

const Template: Story<IToggleProps> = args => <Toggle {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Toggle',
  variant: 'outlined',
  name: 'name',
};
