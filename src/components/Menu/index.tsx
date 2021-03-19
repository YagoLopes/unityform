import React, { useEffect, useRef, useState } from 'react';

import { MenuItem, Menu as Material, Button } from '@material-ui/core';

import { useField } from '@unform/core';

interface IOption {
  label: string;
  value: string;
}

export interface IMenuProps {
  name: string;
  title?: string;
  options: IOption[];
  onSelect?: Function;
}

export const Menu: React.FC<IMenuProps> = ({
  name,
  title,
  options,
  onSelect,
}) => {
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [option, setOption] = useState<string | undefined>();

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (value: string | undefined) => {
    setAnchorEl(null);
    setOption(value);
    if (onSelect) {
      //A ideia e usar esse callback junto com o `formRef.current.submitForm();`
      //https://unform.dev/guides/manual-form-submit
      onSelect();
    }
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
      <Material
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={toggle}
      >
        {options.map(opt => (
          <MenuItem key={opt.value} onClick={() => handleClose(opt.value)}>
            {opt.label}
          </MenuItem>
        ))}
      </Material>
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
