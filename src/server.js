import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { getAllStudents, getStudentById } from './services/students.js';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(express.json());
  app.use(cors());

  // app.use('*', (req, res, next) => {
  //   console.log(`Login time: ${new Date().toLocaleString()}`);
  //   next();
  // });
  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.json({
      status: 200,
      message: 'Successfully got all students',
      data: students,
    });
  });
  app.get('/students/:studentId', async (req, res) => {
    const student = await getStudentById(req.params.studentId);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: `Student with id: ${req.params.studentId} not found!`,
      });
    }
    

    res.json({
      status: 200,
      message: `Successfully got a student with ${req.params.studentId}`,
      data: student,
    });
  });

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = Number(env(ENV_VARS.PORT, 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    console.log(`Login time: ${new Date().toLocaleString()}`);
  });
};
