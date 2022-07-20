import { Request, Response } from 'express';
import { ErrorType, SuccessType } from '../constants';
import { ValueOf } from '../types';

class ErrorResponse {
  constructor(protected request: Request, protected response: Response) {}

  default() {
    return this.send({
      code: 500,
      type: ErrorType.DEFAULT_ERROR,
      message: this.request.t('error_message.default'),
    });
  }

  wrongCredentials() {
    return this.send({
      code: 601,
      type: ErrorType.AUTH_ERROR,
      message: this.request.t('error_message.wrong_credentials'),
    });
  }

  couldNotSignUp() {
    return this.send({
      code: 701,
      type: ErrorType.USER_ERROR,
      message: this.request.t('error_message.could_not_sign_up'),
    });
  }

  usernameAlreadyTaken() {
    return this.send({
      code: 702,
      type: ErrorType.USER_ERROR,
      message: this.request.t('error_message.username_already_taken'),
    });
  }

  userNotFound() {
    return this.send({
      code: 703,
      type: ErrorType.USER_ERROR,
      message: this.request.t('error_message.user_not_found'),
    });
  }

  couldNotSignIn() {
    return this.send({
      code: 704,
      type: ErrorType.USER_ERROR,
      message: this.request.t('error_message.could_not_sign_in'),
    });
  }

  couldNotGetTodo() {
    return this.send({
      code: 801,
      type: ErrorType.TODO_ERROR,
      message: this.request.t('error_message.could_not_get_todo'),
    });
  }

  couldNotAddTodo() {
    return this.send({
      code: 802,
      type: ErrorType.TODO_ERROR,
      message: this.request.t('error_message.could_not_add_todo'),
    });
  }

  couldNotUpdateTodo() {
    return this.send({
      code: 803,
      type: ErrorType.TODO_ERROR,
      message: this.request.t('error_message.could_not_update_todo'),
    });
  }

  couldNotRemoveTodo() {
    return this.send({
      code: 804,
      type: ErrorType.TODO_ERROR,
      message: this.request.t('error_message.could_not_remove_todo'),
    });
  }

  private send(error: {
    code: number;
    type: ValueOf<typeof ErrorType>;
    message: string;
  }) {
    return this.response.status(500).send(error);
  }
}

class SuccessResponse {
  constructor(protected request: Request, protected response: Response) {}

  default(data?: { [key: string]: any }) {
    return this.send({
      code: 200,
      type: SuccessType.DEFAULT_SUCCESS,
      message: this.request.t('success_message.default'),
      data,
    });
  }

  private send(success?: {
    code: number;
    type: ValueOf<typeof SuccessType>;
    message: string;
    data?: { [key: string]: any };
  }) {
    return this.response.status(200).send(success);
  }
}

class ServerResponse {
  constructor(protected request: Request, protected response: Response) {}

  get error() {
    return new ErrorResponse(this.request, this.response);
  }
  get success() {
    return new SuccessResponse(this.request, this.response);
  }
}

export { ServerResponse };
