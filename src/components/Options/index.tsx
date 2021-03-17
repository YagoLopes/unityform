import React, { useEffect, useRef, useState } from 'react';

import { MenuItem, Menu, Button } from '@material-ui/core';

import { useField } from '@unform/core';

interface IOption {
  label: string;
  value: string;
}

export interface IOptionsProps {
  name: string;
  title?: string;
  options: IOption[];
}

export const Options: React.FC<IOptionsProps> = ({ name, title, options }) => {
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [option, setOption] = useState<string | undefined>();

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onChange = (
    event: React.MouseEvent<HTMLButtonElement> | any,
    value: string,
  ) => {
    toggle(event);
    setOption(value);
  };

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Button onClick={toggle}>{title}</Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={toggle}
      >
        {options.map(opt => (
          <MenuItem
            key={opt.value}
            onClick={event => onChange(event, opt.value)}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
      <input
        style={{ display: 'none' }}
        name={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        value={option}
      />
    </>
  );
};
