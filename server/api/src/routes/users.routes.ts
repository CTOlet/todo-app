import express from 'express';
import { refresh, signIn, signUp } from '../controllers';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/refresh', refresh);

export { router as usersRoutes };
