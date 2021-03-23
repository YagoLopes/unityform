import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { AutocompleteAsync } from '../components';
import { IAutocompletePropsAsync } from '../components/AutocompleteAsync';

export default {
  title: 'Example/AutocompleteAsync',
  component: AutocompleteAsync,
} as Meta;

const Template: Story<IAutocompletePropsAsync> = args => (
  <AutocompleteAsync {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Example AutocompleteAsync',
  name: 'autocompleteAsync',
  getOptions: () => [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ],
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
};
