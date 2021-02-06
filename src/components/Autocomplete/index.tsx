import React, { useEffect, useRef } from 'react';

import { Box, FormControl, FormHelperText, TextField } from '@material-ui/core';
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

export const Autocomplete: React.FC<IAutocompleteProps> = ({
  name,
  fullWidth,
  title,
  options,
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
        <Material
          options={options}
          getOptionLabel={option => option.label}
          renderInput={params => (
            <>
              <TextField
                // InputLabelProps={{ shrink: true }}
                name={fieldName}
                // id={fieldName}
                label={`${title} ${required ? '*' : ''}`}
                error={!!error}
                inputRef={inputRef}
                defaultValue={defaultValue}
                {...params}
                {...rest}
              />
            </>
          )}
        />

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
