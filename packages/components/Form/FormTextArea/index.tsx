import {
  FormControl,
  FormHelperText,
  TextareaAutosize,
  type TextareaAutosizeProps,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '../formBase.module.css';
import type { BaseFormType } from '../formBase.type';

import textAreaStyle from './index.module.css';

const FormTextArea: React.FC<BaseFormType & TextareaAutosizeProps> = ({
  name,
  label,

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
      render={({
        field: { ref: fieldRef, value, ...fieldProps },
        fieldState: { error },
      }) => (
        <FormControl
          className={clsx([props?.className, styles.baseFormContainer])}
          error={!!error}
          fullWidth={fullWidth}
        >
          <div className={styles.label}>{label}</div>
          <TextareaAutosize
            className={textAreaStyle.textareaLayout}
            {...fieldProps}
            value={value ?? ''}
            ref={fieldRef}
            maxRows={props?.minRows ?? 10}
            minRows={props?.minRows ?? 5}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormTextArea;
