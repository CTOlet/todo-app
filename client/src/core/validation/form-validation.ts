import { t } from 'i18next';

const FormValidation = {
  required: (value: any) => {
    return ['', null, undefined].includes(value)
      ? t('form.validation.required')
      : true;
  },
};

export { FormValidation };
