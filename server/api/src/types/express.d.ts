import { User } from '@prisma/client';
import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
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
