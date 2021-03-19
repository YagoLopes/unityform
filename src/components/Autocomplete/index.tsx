import React, { useEffect, useRef } from 'react';

import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import Material from '@material-ui/lab/Autocomplete';

import { useField } from '@unform/core';

interface IOption {
  label: string;
  value: string | boolean | number;
}
export interface IAutocompleteProps {
  name: string;
  fullWidth?: boolean;
  title?: string;
  required?: boolean;
  options: Array<IOption>;
}

export const Autocomplete: React.FC<IAutocompleteProps & TextFieldProps> = ({
  name,
  fullWidth,
  title,
  options,
  required,
  variant,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        const option = options.find(
          option => option.label === ref.current.value,
        );
        return option;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <Material
        options={options}
        getOptionLabel={option => option.label}
        defaultValue={defaultValue}
        renderInput={params => (
          <TextField
            label={`${title} ${required ? '*' : ''}`}
            error={!!error}
            variant={variant}
            inputRef={inputRef}
            name={fieldName}
            {...params}
            {...rest}
          />
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
