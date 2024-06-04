import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { getAllStudents, getStudentById } from './services/students.js';
import { isValidObjectId } from 'mongoose';

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
    const id = req.params.studentId;

    if (isValidObjectId(id)) {
      try {
        const student = await getStudentById(id);
        if (!student) {
          return res.status(404).json({
            status: 404,
            message: `Student with ID: "${id}" not found!`,
          });
        }

        return res.json({
          status: 200,
          message: `Successfully got a student with ID: "${id}"`,
          data: student,
        });
      } catch (err) {
        console.log(err);
      }
    }

    return res.json({
      status: 404,
      message: `ID: "${id}" is not valid!`,
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
