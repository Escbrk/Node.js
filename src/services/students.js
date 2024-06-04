import { Student } from '../db/models/student.js';

export const getAllStudents = async () => {
  return await Student.find();
};
