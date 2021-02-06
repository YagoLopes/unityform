import React, { useEffect, useRef } from 'react';

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Input as Material,
  InputProps,
} from '@material-ui/core';

import { useField } from '@unform/core';

export interface IInputProps extends InputProps {
  name: string;
}

export const Input: React.FC<IInputProps> = ({
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
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Box mx={1} p={1} width="100%" whiteSpace="nowrap" overflow="hidden">
      <FormControl error={!!error} fullWidth={fullWidth}>
        <InputLabel htmlFor={fieldName}>
          {title} {required && '*'}
        </InputLabel>

        <Material
          name={fieldName}
          id={fieldName}
          error={!!error}
          inputRef={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
