import { Request, Response, NextFunction } from 'express';
import { SuccessMessageType } from '../constants';
import { ValueOf } from '../types';

const SuccessResponseMessage = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const send = (success?: {
    code: number;
    type: ValueOf<typeof SuccessMessageType>;
    message: string;
    data?: { [key: string]: any };
  }) => {
    return response.status(200).send(success);
  };

  return {
    default: (data?: { [key: string]: any }) => {
      return send({
        code: 200,
        type: SuccessMessageType.DEFAULT_SUCCESS,
        message: request.t('success_message.default'),
        data,
      });
    },

    signUpCompleted: () => {
      return send({
        code: 200,
        type: SuccessMessageType.USER_SUCCESS,
        message: request.t('success_message.sign_up_completed'),
      });
    },
  };
};

const successMessage = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.successMessage = SuccessResponseMessage({ request, response });
  next();
};

export { successMessage, SuccessResponseMessage };
