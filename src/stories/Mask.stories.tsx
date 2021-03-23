import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Mask } from '../components';
import { IMaskProps } from '../components/Mask';

export default {
  title: 'Example/Mask',
  component: Mask,
} as Meta;

const Template: Story<IMaskProps> = args => <Mask {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Fone Mask',
  name: 'mask',
  mask: '(99) 9 9999-9999',
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
  disabled: false,
};
