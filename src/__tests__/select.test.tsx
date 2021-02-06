import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { Select, Form } from '../components';

import { render } from '@testing-library/react';

describe('Input', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <Select name="name" options={options} />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });

  it('should load initial data inside form elements', () => {
    const mockFunction = jest.fn();
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];
    const { container } = render(
      <Form initialData={{ name: options[0].value }} onSubmit={mockFunction}>
        <Select name="name" options={options} />
      </Form>,
    );

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'a',
    );
  });
});
