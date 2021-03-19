import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Autocomplete } from '../components';
import { IAutocompleteProps } from '../components/Autocomplete';
import { TextFieldProps } from '@material-ui/core';

export default {
  title: 'Example/Autocomplete',
  component: Autocomplete,
} as Meta;

const Template: Story<IAutocompleteProps & TextFieldProps> = args => (
  <Autocomplete fullWidth {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Example Autocomplete',
  name: 'name',
  options: [
    { label: 'A', value: 1 },
    { label: 'B', value: 'b' },
    { label: 'C', value: true },
  ],
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
};
