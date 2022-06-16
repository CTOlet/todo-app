import { useRef } from 'react';
import { useButton } from 'react-aria';
import { AriaButtonProps } from '@react-types/button';

type ButtonProps = AriaButtonProps & {
  appearance: 'primary' | 'secondary';
};

const Button = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      ref={ref}
      {...buttonProps}
      className={`flex items-center justify-center h-12 px-4 mt-2 text-sm text-center transition-colors duration-300 transform border rounded-lg focus:outline-none ${
        props.appearance === 'primary'
          ? 'bg-slate-600 hover:bg-slate-500 text-slate-50'
          : 'bg-slate-50 hover:bg-slate-200 text-slate-600'
      }`}
    >
      {props.children}
    </button>
  );
};

export { Button };
export type { ButtonProps };
