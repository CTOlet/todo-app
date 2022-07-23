import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input, Text, Title } from '../components';
import { isRequired } from '../core/validation';
import { dialog } from '../services';

type SignInFormFields = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { t } = useTranslation();
  const signInForm = useForm<SignInFormFields>({
    defaultValues: { username: 'admin', password: 'admin' },
  });

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='w-full max-w-md'>
        <div>
          <div>
            <Title>Sign in</Title>
          </div>
          <div className='mt-2'>
            <Text>Sign in to your account</Text>
          </div>
        </div>

        <div>
          <div className='mt-6'>
            <Controller
              control={signInForm.control}
              name='username'
              rules={{
                validate: {
                  isRequired,
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  ref={field.ref}
                  label={t('form.label.username')}
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
              control={signInForm.control}
              name='password'
              rules={{
                validate: {
                  isRequired,
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  ref={field.ref}
                  type='password'
                  label={t('form.label.password')}
                  value={field.value}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </div>
        <div>
          <div className='mt-2 flex justify-end'>
            <Button color='blue'>{t('action.sign_in')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignIn };
