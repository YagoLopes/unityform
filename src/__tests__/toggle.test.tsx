import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { Toggle, Form } from '../components';

import { render } from '@testing-library/react';

describe('Toggle', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <Toggle name="name" />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });

  it('should load initial data inside form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form initialData={{ name: 'true' }} onSubmit={mockFunction}>
        <Toggle name="name" />
      </Form>,
    );

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'true',
    );
  });
});
