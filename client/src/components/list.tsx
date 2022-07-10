import { Text } from './text';
import { Title } from './title';

type ListProps = {
  entries: { title: string; description: string }[];
};

const List = ({ entries }: ListProps) => {
  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      {entries.map((entry, index) => {
        return (
          <div key={index} className='cursor-pointer'>
            <div className='px-4 py-5 sm:px-6'>
              <div>
                <Title>{entry.title}</Title>
              </div>
              <div className='mt-2'>
                <Text>{entry.description}</Text>
              </div>
            </div>

            {index < entries.length - 1 ? (
              <div className='border-t border-gray-200' />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export { List };
export type { ListProps };
