import React, { useEffect, useRef } from 'react';
import InputMask, { Props } from 'react-input-mask';

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Input as Material,
  InputProps,
} from '@material-ui/core';

import { useField } from '@unform/core';

export interface IMaskProps extends InputProps {
  name: string;
  mask: string;
}

export const Mask: React.FC<IMaskProps> = ({
  name,
  fullWidth,
  title,
  required,
  mask,
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
        <InputLabel htmlFor="component-error">
          {title} {required && '*'}
        </InputLabel>
        <InputMask mask={mask} defaultValue={defaultValue}>
          {(inputProps: React.Component<Props>) => (
            <Material
              name={fieldName}
              id={fieldName}
              error={!!error}
              inputRef={inputRef}
              {...rest}
              {...inputProps}
            />
          )}
        </InputMask>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
