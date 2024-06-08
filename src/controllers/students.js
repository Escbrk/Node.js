import { getAllStudents, getStudentById } from '../services/students.js';

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
