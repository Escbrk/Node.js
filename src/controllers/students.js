import {
  createStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  upsertStudent,
} from '../services/students.js';
import { parseFilters } from '../utils/parseFilters.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getStudentsController = async (req, res) => {
  const query = req.query;

  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);
  const filter = parseFilters(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
    role: req.user.role,
  });

  res.json({
    status: 200,
    message: 'Successfully got all students',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId, req.user._id, req.user.role);

  res.json({
    status: 200,
    message: `Successfully got a student with ID: ${studentId}`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const { body, file } = req;
  const student = await createStudent({ ...body, avatar: file }, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a student',
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  await deleteStudentById(studentId);

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
