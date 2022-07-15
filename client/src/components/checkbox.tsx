import { CheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';

type CheckboxProps = {
  label?: string;
  onChange?: (isChecked: boolean) => void;
};

const Checkbox = ({ label, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <label className='group inline-block'>
        {label}
        {isChecked ? (
          <div
            className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-indigo-500 align-middle'
            onClick={() => {
              setIsChecked(false);
              onChange?.(false);
            }}
          >
            <CheckIcon className='h-3 w-3 stroke-white stroke-2 text-white' />
          </div>
        ) : (
          <div
            className='h-5 w-5 cursor-pointer rounded-full border text-indigo-200'
            onClick={() => {
              setIsChecked(true);
              onChange?.(true);
            }}
          ></div>
        )}
      </label>
    </div>
  );
};

export { Checkbox };
export type { CheckboxProps };
