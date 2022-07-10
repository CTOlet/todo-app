import { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  icon?: ReactNode;
  color?: 'default' | 'gray' | 'red' | 'yellow' | 'green' | 'blue';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

const Button = ({
  icon,
  color = 'default',
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex w-full justify-center rounded-md border ${
        icon ? 'px-2 py-2' : 'px-4 py-2'
      } text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm
        ${
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
      {icon ? (
        <span className={`h-5 w-5 ${children ? 'mx-1' : ''}`}>{icon}</span>
      ) : null}
      {children ? <span className={icon ? 'mx-1' : ''}>{children}</span> : null}
    </button>
  );
};

export { Button };
export type { ButtonProps };
