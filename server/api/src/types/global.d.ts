import { Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string;
        username?: string;
      };
    }
    interface Response {
      error: (options?: { code?: number; message?: string }) => void;
      success: <T>(options?: {
        code?: number;
        message?: string;
        data?: T;
      }) => void;
    }
  }
}
