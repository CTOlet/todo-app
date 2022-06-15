import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

type AddTodoForm = {
  title: string;
};

const Todos = () => {
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
    </>
  );
};

export { Todos };
export type { AddTodoForm };
