import { ReactNode } from 'react';

type TextProps = {
  children?: ReactNode;
};

const Text = ({ children }: TextProps) => {
  return <p className='text-gray-500 text-base leading-relaxed'>{children}</p>;
};

export { Text };
export type { TextProps };
