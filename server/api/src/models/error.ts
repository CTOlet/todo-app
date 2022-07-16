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
  };
  return errors[type];
};

export { Error };
