import { Button, Input, List, Modal, Text, Title } from '../components';
import { PlusSmIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useGetTodos } from '../hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type AddTodoForm = {
  title: string;
  description: string;
};

const Todos = () => {
  const { t } = useTranslation();
  const todos = useGetTodos();
  const { register, handleSubmit } = useForm<AddTodoForm>();

  const [showAddTodo, setShowAddTodo] = useState(false);

  const onSubmit = (form: AddTodoForm) => {
    console.log(form);
  };

  return (
    <>
      <Title>Todo</Title>

      {todos.data ? <List entries={todos.data!} /> : null}

      <Button
        color='default'
        icon={<PlusSmIcon />}
        onClick={() => setShowAddTodo((s) => !s)}
      />

      <Modal
        isOpen={showAddTodo}
        content={
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
        }
        footer={
          <>
            <div className='sm:ml-2'>
              <Button color='blue'>{t('add_todo.add_button')}</Button>
            </div>
            <div className='mt-2 sm:mt-0'>
              <Button color='default' onClick={() => setShowAddTodo((s) => !s)}>
                {t('add_todo.cancel_button')}
              </Button>
            </div>
          </>
        }
      />
    </>
  );
};

export { Todos };
export type { AddTodoForm };
