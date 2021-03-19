import React from 'react';
import Provider from './Provider';

export const decorators = [
  Story => (
    <Provider>
      <Story />
    </Provider>
  ),
];
