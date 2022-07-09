import { ReactNode } from 'react';

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className='text-gray-900 text-xl lg:text-2xl font-semibold'>
      {children}
    </h1>
  );
};

export { Title };
export type { TitleProps };
