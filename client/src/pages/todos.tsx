import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button, Modal, Text, Title } from '../components';
import { useState } from 'react';
import { useGetTodos } from '../hooks';

type AddTodoForm = {
  title: string;
  details: string;
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

      {todos.data?.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.id} | {todo.title} | {todo.details}
          </div>
        );
      })}

      <Button color='primary' onClick={() => setShowAddTodo((s) => !s)}>
        {t('add_todo.add_button')}
      </Button>

      <Modal
        isOpen={showAddTodo}
        header={
          <>
            <Title>{t('add_todo.title')}</Title>
          </>
        }
        body={
          <>
            <Text>{t('add_todo.description')}</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                defaultValue='...'
                {...register('title', { required: true })}
              />
              <input
                defaultValue='...'
                {...register('details', { required: true })}
              />
              <input type='submit' />
            </form>
          </>
        }
        footer={
          <>
            <Button color='primary'>{t('add_todo.add_button')}</Button>
            <Button color='secondary'>{t('add_todo.cancel_button')}</Button>
          </>
        }
        onClose={() => setShowAddTodo((s) => !s)}
      />
    </>
  );
};

export { Todos };
export type { AddTodoForm };
