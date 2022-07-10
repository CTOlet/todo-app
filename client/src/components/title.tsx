import { ReactNode } from 'react';

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className='text-lg font-medium leading-6 text-gray-900'>{children}</h1>
  );
};

export { Title };
export type { TitleProps };
