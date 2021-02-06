import React from 'react';
import { Form } from '../src/components';
export const decorators = [
  Story => (
    <Form>
      <Story />
    </Form>
  ),
];
