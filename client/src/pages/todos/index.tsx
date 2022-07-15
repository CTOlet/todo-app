import { Checkbox, Text, Title } from '../../components';
import { useForm } from 'react-hook-form';
import {
  useAddTodo,
  useGetTodos,
  useRemoveTodo,
  useUpdateTodo,
} from '../../hooks';
import { useTranslation } from 'react-i18next';
import { TrashIcon } from '@heroicons/react/outline';
import { dialog } from '../../services';
import { TodoForm, TodoFormFields } from './components';
import { Todo } from '../../types';

const Todos = () => {
  const { t } = useTranslation();
  const todos = useGetTodos();
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const removeTodo = useRemoveTodo();
  const todoForm = useForm<TodoFormFields>();

  const openAddTodoDialog = () => {
    todoForm.reset({});

    dialog.info({
      element: (
        <TodoForm
          title={t('dialog.add_todo.title')}
          text={t('dialog.add_todo.text')}
          form={todoForm}
        />
      ),
      actions: {
        confirm: {
          label: t('action.add'),
          onClick: () => {
            todoForm.handleSubmit((todoForm) => {
              addTodo.mutateAsync(todoForm).then(() => {
                dialog.close();
              });
            })();
          },
        },
      },
    });
  };

  const openUpdateTodoDialog = (todo: Todo) => {
    todoForm.reset({
      title: todo.title,
      description: todo.description,
    });

    dialog.info({
      element: (
        <TodoForm
          title={t('dialog.update_todo.title')}
          text={t('dialog.update_todo.text')}
          form={todoForm}
        />
      ),
      actions: {
        confirm: {
          label: t('action.update'),
          onClick: () => {
            todoForm.handleSubmit((todoForm) => {
              updateTodo
                .mutateAsync({
                  id: todo.id,
                  ...todoForm,
                })
                .then(() => {
                  dialog.close();
                });
            })();
          },
        },
      },
    });
  };

  const openRemoveTodoDialog = (todo: Todo) => {
    dialog.warn({
      element: (
        <>
          <div>
            <Title size={2}>{t('dialog.remove_todo.title')}</Title>
          </div>
          <div className='mt-2'>
            <Text>{t('dialog.remove_todo.text')}</Text>
          </div>
        </>
      ),
      actions: {
        confirm: {
          label: t('action.remove'),
          onClick: () => {
            removeTodo.mutateAsync(todo.id).then(() => {
              dialog.close();
            });
          },
        },
      },
    });
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Title size={1}>{t('title')}</Title>
        <a
          href='#'
          className='text-indigo-500'
          onClick={() => openAddTodoDialog()}
        >
          {t('action.new_todo')}
        </a>
      </div>

      <div className='mt-8 divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow'>
        {todos.data?.map((todo, index) => {
          return (
            <div key={index}>
              <div className='flex px-6 py-4 sm:px-6'>
                <div className='flex items-center p-2'>
                  <Checkbox
                    onChange={() => {
                      // TODO: complete todo
                    }}
                  />
                </div>
                <div
                  className='flex-grow cursor-pointer px-2'
                  onClick={() => openUpdateTodoDialog(todo)}
                >
                  <div>
                    <Title size={3}>{todo.title}</Title>
                  </div>
                  <div>
                    <Text>{todo.description}</Text>
                  </div>
                </div>
                <div
                  className='flex cursor-pointer items-center p-2'
                  onClick={() => openRemoveTodoDialog(todo)}
                >
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
