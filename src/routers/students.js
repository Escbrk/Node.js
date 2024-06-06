import { Router } from 'express';
import {
  getStudentsController,
  getStudentByIdController,
} from '../controllers/students.js';

const studentsRouter = Router();

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

export default studentsRouter;
