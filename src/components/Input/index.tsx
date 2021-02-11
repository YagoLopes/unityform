import React, { useEffect, useRef } from 'react';

import {
  Box,
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
    <Box mx={1} p={1} width="100%" whiteSpace="nowrap" overflow="hidden">
      <FormControl error={!!error} fullWidth={fullWidth}>
        <Material
          InputLabelProps={{ shrink: true }}
          label={`${title}${required ? '*' : ''}`}
          name={fieldName}
          variant="outlined"
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
