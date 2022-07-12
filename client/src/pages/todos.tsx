import { Button, Input, Text, Title } from '../components';
import { PlusSmIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useAddTodo, useGetTodos } from '../hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrashIcon } from '@heroicons/react/outline';
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
        setShowAddTodo((s) => !s);
      },
    },
  );
  const { register, handleSubmit } = useForm<AddTodoForm>();

  const [showAddTodo, setShowAddTodo] = useState(false);

  const onSubmit = (form: AddTodoForm) => {
    console.log(form);
  };

  return (
    <>
      <Title>Todo</Title>

      <div className='divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow'>
        {todos.data?.map((todo, index) => {
          return (
            <div key={index} className='cursor-pointer'>
              <div className='flex px-6 py-4 sm:px-6'>
                <div className='flex-grow'>
                  <div>
                    <Title>{todo.title}</Title>
                  </div>
                  <div>
                    <Text>{todo.description}</Text>
                  </div>
                </div>
                <div className='flex items-center p-2'>
                  <div className='h-5 w-5 text-red-500'>
                    <TrashIcon />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        color='default'
        icon={<PlusSmIcon />}
        onClick={() =>
          modal.open({
            content: (
              <>
                <div>
                  <Title>{t('add_todo.title_modal')}</Title>
                </div>
                <div className='mt-2'>
                  <Text>{t('add_todo.text_modal')}</Text>
                </div>

                <div className='mt-6'>
                  <Input label={t('add_todo.title_label')} />
                </div>
                <div className='mt-2'>
                  <Input label={t('add_todo.description_label')} />
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
                    {t('add_todo.add_button')}
                  </Button>
                </div>
                <div className='mt-2 sm:mt-0'>
                  <Button color='default' onClick={() => modal.close()}>
                    {t('add_todo.cancel_button')}
                  </Button>
                </div>
              </>
            ),
          })
        }
      />
    </>
  );
};

export { Todos };
export type { AddTodoForm };
