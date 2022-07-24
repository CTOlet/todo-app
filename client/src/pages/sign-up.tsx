import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input, Text, Title } from '../components';
import { isRequired } from '../core/validation';

type SignUpFormFields = {
  username: string;
  password: string;
};

const SignUp = () => {
  const { t } = useTranslation();
  const signUpForm = useForm<SignUpFormFields>({});

  return (
    <div className='flex h-5/6 items-center justify-center'>
      <div className='w-full max-w-md'>
        <div>
          <div>
            <Title>{t('page.sign_up.title')}</Title>
          </div>
          <div className='mt-2'>
            <Text>{t('page.sign_up.text')}</Text>
          </div>
        </div>

        <div>
          <div className='mt-6'>
            <Controller
              control={signUpForm.control}
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
              control={signUpForm.control}
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
          <div className='mt-8 flex flex-col items-center justify-center'>
            <div className='w-full'>
              <Button color='blue' isFullWidth={true}>
                {t('action.sign_up')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
