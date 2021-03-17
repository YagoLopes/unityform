import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Options } from '../components';
import { IOptionsProps } from '../components/Options';

export default {
  title: 'Example/Options',
  component: Options,
} as Meta;

const Template: Story<IOptionsProps> = args => <Options {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example Options',
  name: 'name',
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ],
};
