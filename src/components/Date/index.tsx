import React, { useEffect, useRef, useState } from 'react';

import brLocale from 'date-fns/locale/pt-BR';

import { FormControl } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useField } from '@unform/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { stringToDate } from '../../utils/date';
export interface IDatePickerProps {
  name: string;
  fullWidth?: boolean;
  title?: string;
  required?: boolean;
  disabled?: boolean;
  disableFuture?: boolean;
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
  variant,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        const value = ref.current.value || null;
        if (!value) {
          return null;
        }
        const date = stringToDate(value, 'dd/MM/yyyy', '/');
        return date;
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
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
      <FormControl error={!!error} fullWidth={fullWidth}>
        <KeyboardDatePicker
          name={fieldName}
          value={date}
          error={!!error}
          onChange={value => setDate(value)}
          helperText={error}
          inputRef={inputRef}
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
      </FormControl>
    </MuiPickersUtilsProvider>
  );
};
