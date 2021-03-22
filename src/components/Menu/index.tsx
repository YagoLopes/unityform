import React, { useEffect, useRef, useState } from 'react';

import {
  MenuItem,
  Menu as Material,
  Button,
  IconButton,
  Tooltip,
  SvgIconTypeMap,
} from '@material-ui/core';

import { useField } from '@unform/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface IOption {
  label: string;
  value: string;
}

export interface IMenuProps {
  name: string;
  title?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  tooltip?: string;
  options: IOption[];
  onSelect?: Function;
}

export const Menu: React.FC<IMenuProps> = ({
  name,
  title,
  options,
  tooltip = '',
  Icon,
  onSelect,
}) => {
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [option, setOption] = useState<string | undefined>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = async (value: string | undefined) => {
    handleClose();
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
      {Icon ? (
        <Tooltip title={tooltip} placement="top-end">
          <IconButton
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Icon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button onClick={handleClick}>{title}</Button>
      )}
      <Material
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map(opt => (
          <MenuItem key={opt.value} onClick={() => handleSelect(opt.value)}>
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
