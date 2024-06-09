import {
  createStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  upsertStudent,
} from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();
  res.json({
    status: 200,
    message: 'Successfully got all students',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const id = req.params.studentId;
  const student = await getStudentById(id);

  res.json({
    status: 200,
    message: `Successfully got a student with ID: "${id}"`,
    data: student,
  });

  //   if (isValidObjectId(id)) {
  //     try {
  //       if (!student) {
  //         return res.status(404).json({
  //           status: 404,
  //           message: `Student with ID: "${id}" not found!`,
  //         });
  //       }

  //       return res.json({
  //         status: 200,
  //         message: `Successfully got a student with ID: "${id}"`,
  //         data: student,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   return res.json({
  //     status: 404,
  //     message: `ID: "${id}" is not valid!`,
  //   });
};

export const createStudentController = async (req, res) => {
  const { body } = req;
  const student = await createStudent(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student`,
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const id = req.params.studentId;
  await deleteStudentById(id);

  res.status(204).send();
};

export const patchStudentController = async (req, res) => {
  const { body } = req;
  const { studentId } = req.params;
  const { student } = await upsertStudent(studentId, body);

  res.status(200).json({
    status: 200,
    message: `Successfully patched a student`,
    data: student,
  });
};

export const putStudentController = async (req, res) => {
  const { body } = req;
  const { studentId } = req.params;
  const { student, isNew } = await upsertStudent(studentId, body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student`,
    data: student,
  });
};
