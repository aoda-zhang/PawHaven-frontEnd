import { TextField, type TextFieldProps } from '@mui/material';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '../formBase.module.css';
import type { BaseFormType, BaseTextFieldType } from '../formBase.type';

const FormInput: React.FC<
  BaseFormType & TextFieldProps & BaseTextFieldType
> = ({
  name,
  label,
  defaultValue = '',
  type = 'text',
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
        <div
          className={classNames([props?.className, styles.baseFormContainer])}
        >
          <div className={styles.label}>{label}</div>
          <TextField
            {...field}
            {...props}
            fullWidth={fullWidth}
            variant={props?.variant ?? 'outlined'}
            required={props?.required}
            error={!!error}
            type={type}
            helperText={error?.message}
          />
        </div>
      )}
    />
  );
};

export default memo(FormInput);
