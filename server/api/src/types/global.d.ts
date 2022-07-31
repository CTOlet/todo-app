import { Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: number;
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
