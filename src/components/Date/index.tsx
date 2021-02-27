import React, { useEffect, useRef, useState } from 'react';

import brLocale from 'date-fns/locale/pt-BR';

import { Box, FormControl, FormHelperText } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useField } from '@unform/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface IDatePickerProps {
  name: string;
  fullWidth?: boolean;
  title?: string;
  required?: boolean;
  disabled?: boolean;
  disableFuture?: boolean;
  defaultValue?: Date;
  value?: MaterialUiPickersDate;
  variant?: 'standard' | 'filled' | 'outlined';
}

export const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  fullWidth,
  title,
  required,
  disabled,
  disableFuture,
  defaultValue,
  variant,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
      <Box ml={1} mr={1} p={1} style={{ width: '100%' }}>
        <FormControl error={!!error} fullWidth={fullWidth}>
          <KeyboardDatePicker
            name={fieldName}
            id={fieldName}
            value={date}
            error={!!error}
            onChange={value => setDate(value)}
            helperText={error}
            inputRef={inputRef}
            defaultValue={defaultValue}
            label={`${title} ${required ? '*' : ''}`}
            openTo="year"
            format="dd/MM/yyyy"
            disabled={!!disabled}
            disableFuture={!!disableFuture}
            minDateMessage="Data menor que a data mínima"
            invalidDateMessage="Formato da data é inválido"
            maxDateMessage="Data maior que o permitido"
            inputVariant={variant}
            {...rest}
          />

          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </Box>
    </MuiPickersUtilsProvider>
  );
};
