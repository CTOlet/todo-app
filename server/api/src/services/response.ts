import { Request, Response } from 'express';
import { ErrorResponseType, SuccessResponseType } from '../constants';
import { ValueOf } from '../types';

const ErrorResponse = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const send = (error: {
    code: number;
    type: ValueOf<typeof ErrorResponseType>;
    message: string;
  }) => {
    return response.status(500).send(error);
  };

  return {
    default: () => {
      return send({
        code: 500,
        type: ErrorResponseType.DEFAULT_ERROR,
        message: request.t('error_message.default'),
      });
    },

    wrongCredentials: () => {
      return send({
        code: 601,
        type: ErrorResponseType.AUTH_ERROR,
        message: request.t('error_message.wrong_credentials'),
      });
    },

    tokenExpired: () => {
      return send({
        code: 602,
        type: ErrorResponseType.AUTH_ERROR,
        message: request.t('error_message.token_expired'),
      });
    },

    authenticationFailed: () => {
      return send({
        code: 603,
        type: ErrorResponseType.AUTH_ERROR,
        message: request.t('error_message.authentication_failed'),
      });
    },

    couldNotSignUp: () => {
      return send({
        code: 701,
        type: ErrorResponseType.USER_ERROR,
        message: request.t('error_message.could_not_sign_up'),
      });
    },

    usernameAlreadyTaken: () => {
      return send({
        code: 702,
        type: ErrorResponseType.USER_ERROR,
        message: request.t('error_message.username_already_taken'),
      });
    },

    userNotFound: () => {
      return send({
        code: 703,
        type: ErrorResponseType.USER_ERROR,
        message: request.t('error_message.user_not_found'),
      });
    },

    couldNotSignIn: () => {
      return send({
        code: 704,
        type: ErrorResponseType.USER_ERROR,
        message: request.t('error_message.could_not_sign_in'),
      });
    },

    alreadySignedIn: () => {
      return send({
        code: 705,
        type: ErrorResponseType.USER_ERROR,
        message: request.t('error_message.already_signed_in'),
      });
    },

    couldNotGetTodo: () => {
      return send({
        code: 801,
        type: ErrorResponseType.USER_ERROR,
        message: request.t('error_message.could_not_get_todo'),
      });
    },

    couldNotAddTodo: () => {
      return send({
        code: 802,
        type: ErrorResponseType.TODO_ERROR,
        message: request.t('error_message.could_not_add_todo'),
      });
    },

    couldNotUpdateTodo: () => {
      return send({
        code: 803,
        type: ErrorResponseType.TODO_ERROR,
        message: request.t('error_message.could_not_update_todo'),
      });
    },

    couldNotRemoveTodo: () => {
      return send({
        code: 804,
        type: ErrorResponseType.TODO_ERROR,
        message: request.t('error_message.could_not_remove_todo'),
      });
    },
  };
};

const SuccessResponse = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const send = (success?: {
    code: number;
    type: ValueOf<typeof SuccessResponseType>;
    message: string;
    data?: { [key: string]: any };
  }) => {
    return response.status(200).send(success);
  };

  return {
    default: (data?: { [key: string]: any }) => {
      return send({
        code: 200,
        type: SuccessResponseType.DEFAULT_SUCCESS,
        message: request.t('success_message.default'),
        data,
      });
    },

    signUpCompleted: () => {
      return send({
        code: 200,
        type: SuccessResponseType.USER_SUCCESS,
        message: request.t('success_message.sign_up_completed'),
      });
    },
  };
};

const createResponse = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  return {
    get error() {
      return ErrorResponse({ request, response });
    },
    get success() {
      return SuccessResponse({ request, response });
    },
  };
};

export { createResponse };
