import express from 'express';
import { refresh, signIn, signUp, signOut } from '../controllers';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/refresh', refresh);
router.post('/signout', signOut);

export { router as usersRoutes };
