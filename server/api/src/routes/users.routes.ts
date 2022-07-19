import express from 'express';
import { refresh, me, signIn, signUp } from '../controllers';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/me', me);
router.post('/refresh', refresh);

export { router as usersRoutes };
