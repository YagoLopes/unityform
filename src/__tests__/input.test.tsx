import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { Input, Form } from '../components';

import { render } from '@testing-library/react';

describe('Input', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <Input name="name" />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });

  it('should load initial data inside form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form initialData={{ name: 'Yago' }} onSubmit={mockFunction}>
        <Input name="name" />
      </Form>,
    );

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'Yago',
    );
  });
});
