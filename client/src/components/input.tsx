import { Text } from './text';

type InputProps = {
  label?: string;
  value?: string;
  onChange?: () => void;
};

const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <>
      <label>
        <div className='text-left'>
          <Text weight='medium'>{label}</Text>
        </div>
        <input
          type='text'
          className='relative mt-1 block w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export { Input };
export type { InputProps };
