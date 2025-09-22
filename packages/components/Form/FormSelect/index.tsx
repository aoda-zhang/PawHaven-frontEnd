import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '../formBase.module.css';
import type { BaseFormType, BaseSelectType } from '../formBase.type';

const FormSelect: React.FC<BaseFormType & BaseSelectType & SelectProps> = ({
  name,
  label,
  options,
  defaultValue = '',
  fullWidth = true,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          className={classNames([props?.className, styles.baseFormContainer])}
          error={!!error}
          fullWidth={fullWidth}
        >
          <div className={styles.label}>{label}</div>
          <Select
            {...field}
            {...props}
            variant={props?.variant ?? 'outlined'}
            required={props?.required}
          >
            {options?.map((item) => (
              <MenuItem key={item?.value} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
