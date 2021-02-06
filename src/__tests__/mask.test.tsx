import React from 'react';

import '@testing-library/jest-dom/extend-expect.js';

import { Mask, Form } from '../components';

import { render } from '@testing-library/react';

describe('Mask', () => {
  it('should render form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form onSubmit={mockFunction}>
        <Mask name="fone" mask="(99) 9 9999-9999" />
      </Form>,
    );

    expect(!!container.querySelector('input[name=fone]')).toBe(true);
  });

  it('should load initial data inside form elements', () => {
    const mockFunction = jest.fn();
    const { container } = render(
      <Form initialData={{ cep: '99999999' }} onSubmit={mockFunction}>
        <Mask title="Example CEP Mask" name="cep" mask="99.999-999" />
      </Form>,
    );

    expect(container.querySelector('input[name=cep]')).toHaveAttribute(
      'value',
      '99999999',
    );
  });
});
