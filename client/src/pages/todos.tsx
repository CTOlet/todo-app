import { Button, Checkbox, Input, Text, Title } from '../components';
import { useForm } from 'react-hook-form';
import { useAddTodo, useGetTodos } from '../hooks';
import { useTranslation } from 'react-i18next';
import { TrashIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { modal } from '../services';

type AddTodoForm = {
  title: string;
  description: string;
};

const Todos = () => {
  const { t } = useTranslation();
  const todos = useGetTodos();

  const addTodo = useAddTodo(
    { title: 'new title', description: 'new description' },
    {
      onSuccess: () => {
        todos.refetch();
        modal.close();
      },
    },
  );

  const { register, handleSubmit } = useForm<AddTodoForm>();

  const onSubmit = (form: AddTodoForm) => {
    console.log(form);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Title size={1}>{t('title')}</Title>
        <a
          href='#'
          className='text-indigo-500'
          onClick={() =>
            modal.open({
              content: (
                <>
                  <div>
                    <Title size={2}>{t('forms.add_todo.title')}</Title>
                  </div>
                  <div className='mt-2'>
                    <Text>{t('forms.add_todo.text')}</Text>
                  </div>

                  <div className='mt-6'>
                    <Input label={t('forms.add_todo.title_label')} />
                  </div>
                  <div className='mt-2'>
                    <Input label={t('forms.add_todo.description_label')} />
                  </div>
                </>
              ),
              actions: (
                <>
                  <div className='sm:ml-2'>
                    <Button
                      color='blue'
                      isLoading={addTodo.isLoading}
                      onClick={() => addTodo.mutate()}
                    >
                      {t('actions.add')}
                    </Button>
                  </div>
                  <div className='mt-2 sm:mt-0'>
                    <Button color='default' onClick={() => modal.close()}>
                      {t('actions.cancel')}
                    </Button>
                  </div>
                </>
              ),
            })
          }
        >
          {t('actions.new_todo')}
        </a>
      </div>

      <div className='mt-8 divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow'>
        {todos.data?.map((todo, index) => {
          return (
            <div key={index} className='cursor-pointer'>
              <div className='flex px-6 py-4 sm:px-6'>
                <div className='flex items-center p-2'>
                  {index <= 3 ? (
                    <Checkbox isChecked={true} />
                  ) : (
                    <Checkbox isChecked={false} />
                  )}
                </div>
                <div className='flex-grow px-2'>
                  <div>
                    <Title size={3}>{todo.title}</Title>
                  </div>
                  <div>
                    <Text>{todo.description}</Text>
                  </div>
                </div>
                <div className='flex items-center p-2'>
                  <TrashIcon className='h-5 w-5 text-red-500' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Todos };
export type { AddTodoForm };
