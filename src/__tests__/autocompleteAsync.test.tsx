import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { AutocompleteAsync, Form } from '../components';

import { render } from '@testing-library/react';

describe('AutocompleteAsync', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <AutocompleteAsync
          name="name"
          getOptions={() => [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });
  it('should load initial data inside form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form
        onSubmit={mockFunction}
        initialData={{
          name: { label: 'A', value: 'a' },
        }}
      >
        <AutocompleteAsync
          name="name"
          getOptions={() => [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </Form>,
    );

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'A',
    );
  });
});
