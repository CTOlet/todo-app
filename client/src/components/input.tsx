import { ForwardedRef, forwardRef } from 'react';
import { Text } from './text';

type InputProps = {
  label?: string;
  value?: string;
  error?: string;
  onChange?: () => void;
  onBlur?: () => void;
};

const Input = forwardRef(
  ({ label, value, error, onChange, onBlur }: InputProps, ref) => {
    return (
      <>
        <label>
          <div className='text-left'>
            <Text weight='medium'>{label}</Text>
          </div>
          <input
            className={`relative mt-1 block w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            ref={ref as ForwardedRef<HTMLInputElement>}
            type='text'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {error ? <p className='pt-2 text-sm text-red-500'>{error}</p> : null}
        </label>
      </>
    );
  },
);

export { Input };
export type { InputProps };
