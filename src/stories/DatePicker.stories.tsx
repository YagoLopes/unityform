import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DatePicker } from '../components';
import { IDatePickerProps } from '../components/Date';

export default {
  title: 'Example/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<IDatePickerProps> = args => <DatePicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Example DatePicker',
  name: 'datePicker',
  variant: 'outlined',
  autoFocus: true,
  fullWidth: true,
};
