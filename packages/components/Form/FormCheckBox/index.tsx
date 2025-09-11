import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  type CheckboxProps,
} from '@mui/material';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '../formBase.module.css';
import type { BaseFormType } from '../formBase.type';

const FormCheckbox: React.FC<BaseFormType & CheckboxProps> = ({
  name,
  label,
  defaultValue = false,
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
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                {...props}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </div>
      )}
    />
  );
};

export default memo(FormCheckbox);
