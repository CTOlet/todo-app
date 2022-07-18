import { Request, Response } from 'express';
import { ErrorType } from '../constants';
import { pg } from '../services';
import { Error } from '../models';

const signUpUser = async (request: Request, response: Response) => {
  try {
    const query = ``;

    const result = await pg.query(query);
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
  }
};

const signInUser = async (request: Request, response: Response) => {
  try {
    const query = ``;

    const result = await pg.query(query);
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
  }
};

const checkAuthUser = async (request: Request, response: Response) => {
  try {
    const query = ``;

    const result = await pg.query(query);
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
  }
};

export { signUpUser, signInUser, checkAuthUser };
