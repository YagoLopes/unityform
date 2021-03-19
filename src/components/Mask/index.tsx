import React, { useEffect, useRef } from 'react';
import InputMask, { Props } from 'react-input-mask';

import {
  FormControl,
  FormHelperText,
  TextField as Material,
  TextFieldProps,
} from '@material-ui/core';

import { useField } from '@unform/core';

export interface IMaskProps {
  name: string;
  mask: string;
}

export const Mask: React.FC<IMaskProps & TextFieldProps> = ({
  name,
  fullWidth,
  title,
  required,
  mask,
  disabled,
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
      <InputMask mask={mask} defaultValue={defaultValue} disabled={disabled}>
        {(inputProps: React.Component<Props>) => (
          <Material
            InputLabelProps={{ shrink: true }}
            label={`${title}${required ? '*' : ''}`}
            name={fieldName}
            error={!!error}
            inputRef={inputRef}
            disabled={disabled}
            variant={variant}
            {...rest}
            {...inputProps}
          />
        )}
      </InputMask>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
