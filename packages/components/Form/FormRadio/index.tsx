import clsx from 'clsx';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import formBaseStyle from '../formBase.module.css';
import type { BaseFormType } from '../formBase.type';

import style from './index.module.css';

interface Option {
  value: string;
  label: string;
}

interface FormRadioProps {
  options: Option[];
}

const FormRadio: FC<BaseFormType & FormRadioProps> = ({
  name,
  label,
  options,
  required,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={clsx(formBaseStyle.baseFormContainer, {
        [formBaseStyle.error]: !!errors[name],
      })}
    >
      <p className={formBaseStyle.label}>{label}</p>
      {options.map((option) => (
        <label
          key={option.value}
          className={style.radioLabel}
          htmlFor={`${name}-${option.value}`}
        >
          <input
            id={`${name}-${option.value}`}
            type="radio"
            value={option.value}
            {...register(
              name,
              required ? { required: 'This field is required' } : {},
            )}
            className={clsx(style.radioInput, {
              [style.radioError]: !!errors[name],
            })}
          />
          {option.label}
        </label>
      ))}
      {errors[name] && (
        <span className={formBaseStyle.errorMessage}>
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default FormRadio;
