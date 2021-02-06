import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import Material from '@material-ui/lab/Autocomplete';

import { useField } from '@unform/core';

interface IOption {
  label: string;
  value: string;
}

export interface IAutocompletePropsAsync {
  name: string;
  fullWidth?: boolean;
  title?: string;
  required?: boolean;
  getOptions: Function;
}

export const AutocompleteAsync: React.FC<IAutocompletePropsAsync> = ({
  name,
  fullWidth,
  title,
  required,
  getOptions,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IOption[]>([]);
  const loading = open && options.length === 0;

  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [time, setTime] = useState<unknown>();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleChange = async (textValue: string) => {
    clearTimeout(time as number);
    const timer = setTimeout(async () => {
      const response = await getOptions(textValue); // For demo purposes.
      setOptions(response);
    }, 1000);
    setTime(timer);
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Box mx={1} p={1} width="100%" whiteSpace="nowrap" overflow="hidden">
      <FormControl error={!!error} fullWidth={fullWidth}>
        <Material
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          options={options}
          loading={loading}
          getOptionSelected={(option, value) => option.label === value.label}
          getOptionLabel={option => option.label}
          fullWidth={fullWidth}
          renderInput={params => (
            <TextField
              {...params}
              {...rest}
              label={`${title} ${required ? '*' : ''}`}
              // InputLabelProps={{ shrink: true }}
              name={fieldName}
              // id={fieldName}
              error={!!error}
              inputRef={inputRef}
              onChange={e => handleChange(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
