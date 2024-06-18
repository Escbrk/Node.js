import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
  logoutController,
} from '../controllers/auth.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/loginSchemaValidator.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
// authRouter.post('/refresh-token');
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
