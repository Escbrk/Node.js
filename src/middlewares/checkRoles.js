import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { studentId } = req.params;

    if (roles.includes('teacher') && user.role === 'teacher') return next();

    if (roles.includes('parent') && user.role === 'parent') {
      const student = await Student.findById({
        _id: studentId,
        parentId: user._id,
      });

      if (!student) return next(createHttpError(403, 'Access error'));
    }
  };
