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

  it('should load initial data inside form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <DatePicker
          name="date"
          defaultValue={new Date('1995-12-17T03:24:00')}
        />
      </Form>,
    );

    expect(container.querySelector('input[name=date]')).toHaveAttribute(
      'value',
      '17/12/1995',
    );
  });
});
