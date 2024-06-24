import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req.user;
    const { studentId } = req.params;

    if (roles.includes(ROLES.TEACHER) && user.role === ROLES.TEACHER)
      return next();

    if (roles.includes(ROLES.PARENT) && user.role === ROLES.PARENT) {
      const student = await Student.findOne({
        _id: studentId,
        parentId: user._id,
      });

      if (!student) return next(createHttpError(403, 'Access error'));
    }
  };
