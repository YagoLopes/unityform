import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox as Material,
} from '@material-ui/core';

import { useField } from '@unform/core';

export interface ICheckboxProps {
  name: string;
  fullWidth?: boolean;
  title?: string;
  required?: boolean;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  name,
  fullWidth,
  title,
  required,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [checked, setChecked] = useState<Boolean>(defaultValue || false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <FormControlLabel
        control={
          <Material
            name={fieldName}
            value={checked}
            onChange={() => setChecked(prevState => !prevState)}
            inputRef={inputRef}
            defaultValue={defaultValue}
            {...rest}
          />
        }
        label={`${title} ${required ? '*' : ''}`}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
