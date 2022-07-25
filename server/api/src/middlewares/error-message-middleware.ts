import { Request, Response, NextFunction } from 'express';
import { ErrorMessageType } from '../constants';
import { ValueOf } from '../types';

const ErrorResponseMessage = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const send = (error: {
    code: number;
    type: ValueOf<typeof ErrorMessageType>;
    message: string;
  }) => {
    return response.status(500).send(error);
  };

  return {
    default: () => {
      return send({
        code: 500,
        type: ErrorMessageType.DEFAULT_ERROR,
        message: request.t('error_message.default'),
      });
    },

    wrongCredentials: () => {
      return send({
        code: 601,
        type: ErrorMessageType.AUTH_ERROR,
        message: request.t('error_message.wrong_credentials'),
      });
    },

    tokenExpired: () => {
      return send({
        code: 602,
        type: ErrorMessageType.AUTH_ERROR,
        message: request.t('error_message.token_expired'),
      });
    },

    authenticationFailed: () => {
      return send({
        code: 603,
        type: ErrorMessageType.AUTH_ERROR,
        message: request.t('error_message.authentication_failed'),
      });
    },

    couldNotSignUp: () => {
      return send({
        code: 701,
        type: ErrorMessageType.USER_ERROR,
        message: request.t('error_message.could_not_sign_up'),
      });
    },

    usernameAlreadyTaken: () => {
      return send({
        code: 702,
        type: ErrorMessageType.USER_ERROR,
        message: request.t('error_message.username_already_taken'),
      });
    },

    userNotFound: () => {
      return send({
        code: 703,
        type: ErrorMessageType.USER_ERROR,
        message: request.t('error_message.user_not_found'),
      });
    },

    couldNotSignIn: () => {
      return send({
        code: 704,
        type: ErrorMessageType.USER_ERROR,
        message: request.t('error_message.could_not_sign_in'),
      });
    },

    alreadySignedIn: () => {
      return send({
        code: 705,
        type: ErrorMessageType.USER_ERROR,
        message: request.t('error_message.already_signed_in'),
      });
    },

    couldNotGetTodo: () => {
      return send({
        code: 801,
        type: ErrorMessageType.USER_ERROR,
        message: request.t('error_message.could_not_get_todo'),
      });
    },

    couldNotAddTodo: () => {
      return send({
        code: 802,
        type: ErrorMessageType.TODO_ERROR,
        message: request.t('error_message.could_not_add_todo'),
      });
    },

    couldNotUpdateTodo: () => {
      return send({
        code: 803,
        type: ErrorMessageType.TODO_ERROR,
        message: request.t('error_message.could_not_update_todo'),
      });
    },

    couldNotRemoveTodo: () => {
      return send({
        code: 804,
        type: ErrorMessageType.TODO_ERROR,
        message: request.t('error_message.could_not_remove_todo'),
      });
    },
  };
};

const errorMessage = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.errorMessage = ErrorResponseMessage({ request, response });
  next();
};

export { errorMessage, ErrorResponseMessage };
