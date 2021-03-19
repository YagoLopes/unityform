import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { DatePicker, Form } from '../components';

import { render } from '@testing-library/react';

describe('Date', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <DatePicker name="name" />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });
});
