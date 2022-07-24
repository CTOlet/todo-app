import { Request, Response } from 'express';
import { ServerResponseType } from '../constants';
import { ValueOf } from '../types';

class ErrorResponse {
  constructor(protected request: Request, protected response: Response) {}

  default() {
    return this.send({
      code: 500,
      type: ServerResponseType.ERROR.DEFAULT,
      message: this.request.t('error_message.default'),
    });
  }

  wrongCredentials() {
    return this.send({
      code: 601,
      type: ServerResponseType.ERROR.AUTH,
      message: this.request.t('error_message.wrong_credentials'),
    });
  }

  tokenExpired() {
    return this.send({
      code: 602,
      type: ServerResponseType.ERROR.AUTH,
      message: this.request.t('error_message.token_expired'),
    });
  }

  authenticationFailed() {
    return this.send({
      code: 603,
      type: ServerResponseType.ERROR.AUTH,
      message: this.request.t('error_message.authentication_failed'),
    });
  }

  couldNotSignUp() {
    return this.send({
      code: 701,
      type: ServerResponseType.ERROR.USER,
      message: this.request.t('error_message.could_not_sign_up'),
    });
  }

  usernameAlreadyTaken() {
    return this.send({
      code: 702,
      type: ServerResponseType.ERROR.USER,
      message: this.request.t('error_message.username_already_taken'),
    });
  }

  userNotFound() {
    return this.send({
      code: 703,
      type: ServerResponseType.ERROR.USER,
      message: this.request.t('error_message.user_not_found'),
    });
  }

  couldNotSignIn() {
    return this.send({
      code: 704,
      type: ServerResponseType.ERROR.USER,
      message: this.request.t('error_message.could_not_sign_in'),
    });
  }

  alreadySignedIn() {
    return this.send({
      code: 705,
      type: ServerResponseType.ERROR.USER,
      message: this.request.t('error_message.already_signed_in'),
    });
  }

  couldNotGetTodo() {
    return this.send({
      code: 801,
      type: ServerResponseType.ERROR.TODO,
      message: this.request.t('error_message.could_not_get_todo'),
    });
  }

  couldNotAddTodo() {
    return this.send({
      code: 802,
      type: ServerResponseType.ERROR.TODO,
      message: this.request.t('error_message.could_not_add_todo'),
    });
  }

  couldNotUpdateTodo() {
    return this.send({
      code: 803,
      type: ServerResponseType.ERROR.TODO,
      message: this.request.t('error_message.could_not_update_todo'),
    });
  }

  couldNotRemoveTodo() {
    return this.send({
      code: 804,
      type: ServerResponseType.ERROR.TODO,
      message: this.request.t('error_message.could_not_remove_todo'),
    });
  }

  private send(error: {
    code: number;
    type: ValueOf<typeof ServerResponseType.ERROR>;
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
      type: ServerResponseType.SUCCESS.DEFAULT,
      message: this.request.t('success_message.default'),
      data,
    });
  }

  signUpCompleted() {
    return this.send({
      code: 200,
      type: ServerResponseType.SUCCESS.USER,
      message: this.request.t('success_message.sign_up_completed'),
    });
  }

  private send(success?: {
    code: number;
    type: ValueOf<typeof ServerResponseType.SUCCESS>;
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
