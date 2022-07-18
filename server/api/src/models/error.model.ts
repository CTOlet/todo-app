import { Request } from 'express';
import { ErrorType } from '../constants';
import { ValueOf } from '../types';

const Error = (type: ValueOf<typeof ErrorType>, request: Request) => {
  const errors = {
    [ErrorType.POST_TODO_EXCEPTION]: {
      code: 600,
      message: request.t('error_message.could_not_post_todo'),
    },
    [ErrorType.GET_TODO_EXCEPTION]: {
      code: 601,
      message: request.t('error_message.could_not_get_todo'),
    },
    [ErrorType.PUT_TODO_EXCEPTION]: {
      code: 602,
      message: request.t('error_message.could_not_put_todo'),
    },
    [ErrorType.DELETE_TODO_EXCEPTION]: {
      code: 603,
      message: request.t('error_message.could_not_delete_todo'),
    },
    [ErrorType.SIGN_UP_USER_EXCEPTION]: {
      code: 604,
      message: request.t('error_message.could_not_sign_up_user'),
    },
    [ErrorType.SIGN_IN_USER_EXCEPTION]: {
      code: 605,
      message: request.t('error_message.could_not_sign_in_user'),
    },
    [ErrorType.CHECK_AUTH_USER_EXCEPTION]: {
      code: 606,
      message: request.t('error_message.could_not_check_auth_user'),
    },
  };
  return errors[type];
};

export { Error };
