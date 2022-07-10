import { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  icon?: ReactNode;
  color?: 'default' | 'gray' | 'red' | 'yellow' | 'green' | 'blue';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

const Button = ({
  icon,
  color = 'default',
  isLoading,
  isDisabled,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`inline-flex w-full justify-center rounded-md border text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm ${
        icon ? 'px-2 py-2' : 'px-4 py-2'
      } ${isDisabled ? 'cursor-not-allowed' : ''} ${
        color === 'default'
          ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
          : color === 'gray'
          ? 'border-transparent bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500'
          : color === 'red'
          ? 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
          : color === 'yellow'
          ? 'border-transparent bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
          : color === 'green'
          ? 'border-transparent bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
          : color === 'blue'
          ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
          : ''
      }
    `}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className={`h-5 w-5 animate-spin ${
            color === 'default' ? 'text-gray-700' : 'text-white'
          } ${children ? 'mx-1' : ''}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            stroke-width='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      ) : icon ? (
        <span className={`h-5 w-5 ${children ? 'mx-1' : ''}`}>{icon}</span>
      ) : null}
      {children ? <span className={icon ? 'mx-1' : ''}>{children}</span> : null}
    </button>
  );
};

export { Button };
export type { ButtonProps };
