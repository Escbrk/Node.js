import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
  logoutController,
  refreshTokenController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/loginSchemaValidator.js';
import { requestResetEmailSchema } from '../validation/requestResetEmailSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';

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
authRouter.post('/refresh-token', ctrlWrapper(refreshTokenController));

authRouter.post('/request-reset-email', ctrlWrapper());

authRouter.post(
  '/request-reset-password',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
