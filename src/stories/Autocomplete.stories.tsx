import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Autocomplete } from '../components';
import { IAutocompleteProps } from '../components/Autocomplete';

export default {
  title: 'Example/Autocomplete',
  component: Autocomplete,
} as Meta;

const Template: Story<IAutocompleteProps> = args => (
  <Autocomplete fullWidth {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Example Autocomplete',
  name: 'name',
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ],
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
};
