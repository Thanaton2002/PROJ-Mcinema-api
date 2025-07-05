import express from 'express'
import { getMe, login, register } from '../controllers/auth.controller.js';
import { registerSchema, validator } from '../validations/validator.js';
import { authCheck } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', validator(registerSchema), register);
authRouter.post('/login', login);
authRouter.get('/me', authCheck, getMe);

export default authRouter;