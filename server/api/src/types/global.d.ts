import { ErrorResponseMessage } from '../middlewares/error-message-middleware';
import { SuccessResponseMessage } from '../middlewares/success-message-middleware';

declare global {
  namespace Express {
    interface Response {
      errorMessage: ReturnType<typeof ErrorResponseMessage>;
      successMessage: ReturnType<typeof SuccessResponseMessage>;
    }
  }
}
