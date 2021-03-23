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
  variant,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const [dateValue, setDateValue] = useState(defaultValue || null);

  /* eslint-disable no-unused-vars */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return dateValue || undefined;
      },
      setValue: (ref, value) => {
        setDateValue(value);
      },
      clearValue: ref => {
        setDateValue(null);
      },
    });
  }, [fieldName, registerField, dateValue]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
      <FormControl error={!!error} fullWidth={fullWidth}>
        <KeyboardDatePicker
          id={fieldName}
          name={fieldName}
          value={dateValue}
          onChange={date => setDateValue(date || null)}
          error={!!error}
          helperText={error}
          inputRef={inputRef}
          label={`${title} ${required ? '*' : ''}`}
          openTo="year"
          format="dd/MM/yyyy"
          minDateMessage="Data menor que a data mínima"
          invalidDateMessage="Data é inválida"
          maxDateMessage="Data maior que o permitido"
          inputVariant={variant}
          autoOk
          {...rest}
        />
      </FormControl>
    </MuiPickersUtilsProvider>
  );
};
