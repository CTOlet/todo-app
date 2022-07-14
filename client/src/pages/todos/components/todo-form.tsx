import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Title, Text, Input } from '../../../components';

type TodoFormFields = {
  title: string;
  description: string;
};

type TodoFormProps = {
  form: UseFormReturn<TodoFormFields>;
};

const TodoForm = (props: TodoFormProps) => {
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
        <Input
          label={t('forms.add_todo.title_label')}
          value={props.form.getValues().title}
          onChange={() => {}}
        />
      </div>
      <div className='mt-2'>
        <Input
          label={t('forms.add_todo.description_label')}
          value={props.form.getValues().description}
          onChange={() => {}}
        />
      </div>
    </>
  );
};

export { TodoForm };
export type { TodoFormFields };
