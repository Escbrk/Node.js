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

const studentsRouter = Router();

studentsRouter.use('/students/:studentId', validateMongoId('studentId'));

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/students/:studentId',
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.patch(
  '/students/:studentId',
  ctrlWrapper(patchStudentController),
);

studentsRouter.put('/students/:studentId', ctrlWrapper(putStudentController));

studentsRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteStudentByIdController),
);

export default studentsRouter;
