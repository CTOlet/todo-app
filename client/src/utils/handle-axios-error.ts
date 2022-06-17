import { AxiosError } from 'axios';

/**
 * Wrapper for handling axios errors which will automatically
 * infer the error type as AxiosError.
 *
 * @param handler fn
 * @returns fn result
 */
const handleAxiosError =
  <Error, Return>(handler: (e: AxiosError<Error>) => Return) =>
  (e: AxiosError<Error>) => {
    return handler(e);
  };

export { handleAxiosError };
