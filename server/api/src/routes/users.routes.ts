import express from 'express';
import { checkAuthUser, signInUser, signUpUser } from '../controllers';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.get('/me', checkAuthUser);

export { router as usersRoutes };
