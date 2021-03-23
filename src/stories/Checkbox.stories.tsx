import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox } from '../components';
import { ICheckboxProps } from '../components/Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<ICheckboxProps> = args => <Checkbox {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Checkbox',
  name: 'checkbox',
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
};
