import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';

import {
  Select as BaseSelect,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  MenuItem,
} from '@material-ui/core';

import { useField } from '@unform/core';

import { SelectProps as BaseSelectProps } from '@material-ui/core/Select/Select';

function isValidValue(value: string | unknown) {
  return typeof value !== 'undefined' && value !== '';
}

export interface SelectOption {
  value: string | number;
  label: string | React.ReactNode;
}

export interface ISelectProps extends Omit<BaseSelectProps, 'name'> {
  name: string;
  options: SelectOption[];
}

export const Select: React.FC<ISelectProps> = ({
  name,
  label,
  style,
  className,
  defaultValue,
  children,
  native,
  onChange,
  value: valueProp,
  multiple,
  variant,
  fullWidth,
  title,
  required,
  options,
  ...restProps
}) => {
  const {
    fieldName,
    registerField,
    defaultValue: defaultFieldValue,
    error,
  } = useField(name);

  const inputRef = useRef(null);
  const defaultInputValue = useMemo(() => {
    if (multiple) {
      return defaultFieldValue || defaultValue || [];
    }
    return defaultFieldValue || defaultValue || '';
  }, [defaultFieldValue, defaultValue, multiple]);
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;

      if (valueProp === undefined && onChange === undefined) {
        setInputValue(() => value);
      }

      if (valueProp === undefined && typeof onChange === 'function') {
        setInputValue(() => value);
        onChange(e, null);
      }

      if (valueProp !== undefined && typeof onChange === 'function') {
        onChange(e, null);
      }
    },
    [valueProp, onChange, setInputValue, multiple, native],
  );

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        getValue() {
          return valueProp || inputValue;
        },
        setValue(_, newValue) {
          handleChange({
            target: { value: newValue },
          });
        },
      });
    }
  }, [fieldName, registerField, handleChange, native, valueProp, inputValue]);

  const baseSelectProps = useMemo(
    () => ({
      value: !valueProp ? inputValue : valueProp,
      inputProps: {
        ...restProps.inputProps,
        ref: inputRef,
      },
      defaultValue: defaultInputValue || inputValue,
      onChange: handleChange,
      name,
      multiple,
      label,
      ...restProps,
    }),
    [
      inputValue,
      defaultInputValue,
      name,
      restProps,
      handleChange,
      valueProp,
      multiple,
      label,
    ],
  );

  const shrink = useMemo(() => {
    if (native) {
      return true;
    }

    if (multiple) {
      return !!(valueProp || inputValue).length;
    }

    return isValidValue(valueProp) || !!isValidValue(inputValue);
  }, [native, multiple, inputValue, valueProp]);
  return (
    <Box mx={1} p={1} width="100%" whiteSpace="nowrap" overflow="hidden">
      <FormControl error={!!error} fullWidth={fullWidth}>
        <InputLabel
          shrink={shrink}
          {...{ 'data-testid': 'select-label' }}
          htmlFor="component-error"
        >
          {title} {required && '*'}
        </InputLabel>

        <BaseSelect
          {...baseSelectProps}
          native={native}
          defaultValue={defaultValue}
        >
          {options.map(({ value, label: l }) => (
            <MenuItem key={value} value={value}>
              {l}
            </MenuItem>
          ))}
        </BaseSelect>

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
