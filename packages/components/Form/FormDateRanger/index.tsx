import { FormControl, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  SingleInputDateRangeField,
  SingleInputDateRangeFieldProps,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from '../formBase.module.css';
import { BaseFormType } from '../formBase.type';

type FormSingleDateRangerProps = BaseFormType &
  Omit<SingleInputDateRangeFieldProps<Dayjs>, 'value' | 'onChange'> & {
    fullWidth?: boolean;
  };

const FormSingleDateRanger: FC<FormSingleDateRangerProps> = ({
  name,
  label,
  defaultValue = [null, null],
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
          <FormControl fullWidth={fullWidth} error={!!error}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputDateRangeField
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    variant: props?.variant ?? 'outlined',
                    required: props?.required,
                    fullWidth,
                  },
                }}
              />
            </LocalizationProvider>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </div>
      )}
    />
  );
};

export default FormSingleDateRanger;
