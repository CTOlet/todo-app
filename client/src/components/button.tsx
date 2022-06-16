import { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  color: 'primary' | 'secondary';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

const Button = ({ color, onClick, children }: ButtonProps) => {
  return (
    <button
      className={
        color === 'primary'
          ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          : 'text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps };
