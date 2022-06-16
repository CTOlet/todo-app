import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button, Modal, Text } from '../components';
import { useState } from 'react';

type AddTodoForm = {
  title: string;
};

const Todos = () => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<AddTodoForm>();

  const onSubmit = (form: AddTodoForm) => {
    console.log(form);
  };

  return (
    <>
      <h1 className='font-bold text-2xl text-blue-900'>
        Todos {t('hello_world')}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='...' {...register('title', { required: true })} />
        <input type='submit' />
      </form>

      <Button color='primary' onClick={() => setShowAddTodo((s) => !s)}>
        Open Add Todo Modal
      </Button>

      <Modal
        isOpen={showAddTodo}
        header='Title'
        body={
          <Text>
            With less than a month to go before the European Union enacts new
            consumer privacy laws for its citizens, companies around the world
            are updating their terms of service agreements to comply.
          </Text>
        }
        footer={
          <>
            <Button color='primary'>Accept</Button>
            <Button color='secondary'>Decline</Button>
          </>
        }
        onClose={() => setShowAddTodo((s) => !s)}
      />
    </>
  );
};

export { Todos };
export type { AddTodoForm };
