import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from '../components';
import { IInputProps } from '../components/Input';

export default {
  title: 'Example/Input',
  component: Input,
} as Meta;

const Template: Story<IInputProps> = args => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Input',
  name: 'input',
  autoFocus: true,
  fullWidth: true,
};
