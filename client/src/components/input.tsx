import { Text } from './text';

type InputProps = {
  label: string;
};

const Input = ({ label }: InputProps) => {
  return (
    <>
      <label>
        <div className='text-left'>
          <Text weight='medium'>{label}</Text>
        </div>
        <input
          type='text'
          className='relative mt-1 block w-full rounded-md border-gray-300 pl-7 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </label>
    </>
  );
};

export { Input };
export type { InputProps };
