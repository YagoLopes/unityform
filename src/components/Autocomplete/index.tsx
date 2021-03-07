import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import Material from '@material-ui/lab/Autocomplete';

import { useField } from '@unform/core';

interface IOption {
  label: string;
  value: string;
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
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleSelect = (optionName: string) => {
    if (optionName) {
      const option = options.find(
        ({ label }) => label === optionName,
      ) as IOption;
      setValue(option);
    } else {
      setValue('');
    }
  };

  return (
    <Box mx={1} p={1} width="100%" whiteSpace="nowrap" overflow="hidden">
      <FormControl error={!!error} fullWidth={fullWidth}>
        <Material
          options={options}
          getOptionLabel={option => option.label}
          defaultValue={defaultValue}
          onChange={(e: any) => handleSelect(e.target.textContent)}
          renderInput={params => (
            <>
              <TextField
                label={`${title} ${required ? '*' : ''}`}
                error={!!error}
                variant={variant}
                {...params}
                {...rest}
              />
            </>
          )}
        />
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          name={fieldName}
          readOnly
          value={value === '' ? '' : JSON.stringify(value)}
        />

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
