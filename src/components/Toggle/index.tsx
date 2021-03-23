import React, { useEffect, useRef } from 'react';

import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Switch as Material,
} from '@material-ui/core';

import { useField } from '@unform/core';

export interface IToggleProps {
  name: string;
  fullWidth?: boolean;
  title?: string;
  required?: boolean;
}

export const Toggle: React.FC<IToggleProps> = ({
  name,
  fullWidth,
  title,
  required,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <FormControlLabel
        control={
          <Material
            name={fieldName}
            inputRef={inputRef}
            checked={defaultValue}
            {...rest}
          />
        }
        label={`${title} ${required ? '*' : ''}`}
      />

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
