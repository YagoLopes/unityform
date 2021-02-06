import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { Autocomplete, Form } from '../components';

import { render } from '@testing-library/react';

describe('Autocomplete', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <Autocomplete
          name="name"
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </Form>,
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });
});
