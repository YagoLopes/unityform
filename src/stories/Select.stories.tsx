import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Select } from '../components';
import { ISelectProps } from '../components/Select';

export default {
  title: 'Example/Select',
  component: Select,
} as Meta;

const Template: Story<ISelectProps> = args => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Autocomplete',
  name: 'select',
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ],
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
};
