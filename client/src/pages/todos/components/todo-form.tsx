import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Title, Text, Input, Textarea } from '../../../components';

type TodoFormFields = {
  title: string;
  description: string;
};

type TodoFormProps = {
  form: UseFormReturn<TodoFormFields>;
};

const TodoForm = ({ form }: TodoFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Title size={2}>{t('forms.add_todo.title')}</Title>
      </div>
      <div className='mt-2'>
        <Text>{t('forms.add_todo.text')}</Text>
      </div>

      <div className='mt-6'>
        <Controller
          control={form.control}
          name='title'
          render={({ field, fieldState }) => (
            <Input
              ref={field.ref}
              label={t('forms.add_todo.title_label')}
              value={field.value}
              error={fieldState.error?.message}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>
      <div className='mt-2'>
        <Controller
          control={form.control}
          name='description'
          render={({ field, fieldState }) => (
            <Textarea
              ref={field.ref}
              label={t('forms.add_todo.description_label')}
              value={field.value}
              error={fieldState.error?.message}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>
    </>
  );
};

export { TodoForm };
export type { TodoFormFields };
