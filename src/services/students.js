import { Student } from '../db/models/student.js';

export const getAllStudents = async () => await Student.find();

export const getStudentById = async (id) => await Student.findById(id);
