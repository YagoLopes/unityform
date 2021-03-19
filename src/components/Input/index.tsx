import React, { useEffect, useRef } from 'react';

import {
  FormControl,
  FormHelperText,
  TextField as Material,
  TextFieldProps,
} from '@material-ui/core';

import { useField } from '@unform/core';

export interface IInputProps {
  name: string;
}

export const Input: React.FC<IInputProps & TextFieldProps> = ({
  name,
  fullWidth,
  title,
  required,
  variant,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <Material
        InputLabelProps={{ shrink: true }}
        label={`${title}${required ? '*' : ''}`}
        name={fieldName}
        error={!!error}
        variant={variant}
        inputRef={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
