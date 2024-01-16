import { Router } from 'express';
import { getAllUsers, login, register } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/index';

const userRouter = Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

userRouter.get('/users', isAuthenticated, getAllUsers);

export default userRouter;