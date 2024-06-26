import { Router } from 'express';
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentByIdController,
  patchStudentController,
  putStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/createStudentSchema.js';
import { updateStudentSchema } from '../validation/updateStudentSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { checkChildPermissions } from '../middlewares/checkChildPermissions.js';
import { upload } from '../middlewares/upload.js';

const studentsRouter = Router();

studentsRouter.use('/:studentId', validateMongoId('studentId'));
studentsRouter.use('/', authenticate);

studentsRouter.get('/', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/',
  upload.single('avatar'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(createStudentSchema),
  ctrlWrapper(putStudentController),
);

studentsRouter.delete(
  '/:studentId',
  checkChildPermissions('teacher', 'parent'),
  ctrlWrapper(deleteStudentByIdController),
);

export default studentsRouter;
