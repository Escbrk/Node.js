import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';
import { ROLES } from '../constants/index.js';
import { saveFile } from '../utils/saveFile.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1; //* page !== 1
  const hasNextPage = page < totalPages; //* Boolean(page < totalPages);

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllStudents = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
  role,
}) => {
  const skip = perPage * (page - 1);

  const studentsFilters = Student.find();

  if (filter.minAge) {
    studentsFilters.where('age').gte(filter.minAge);
  }
  if (filter.maxAge) {
    studentsFilters.where('age').lte(filter.maxAge);
  }
  if (filter.minAvgMark) {
    studentsFilters.where('avgMark').gte(filter.minAvgMark);
  }
  if (filter.maxAvgMark) {
    studentsFilters.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.gender) {
    studentsFilters.where('gender').equals(filter.gender);
  }
  if (typeof filter.onDuty === 'boolean') {
    studentsFilters.where('onDuty').equals(filter.onDuty);
  }

  if (role !== ROLES.TEACHER) {
    studentsFilters.where('parentId').equals(userId);
  }

  const [studentsCount, students] = await Promise.all([
    Student.find().merge(studentsFilters).countDocuments(),
    Student.find()
      .merge(studentsFilters)
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder.toLowerCase(),
      })
      .exec(),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    studentsCount,
  );

  return {
    students,
    ...paginationInformation,
  };
};

export const getStudentById = async (studentId, userId, role) => {
  let student;

  if (role !== ROLES.TEACHER) {
    student = await Student.findOne({ _id: studentId, userId });
  } else {
    student = await Student.findById({ _id: studentId });
  }

  if (!student) {
    throw createHttpError(403, 'Access error!');
  }

  return student;
};

export const createStudent = async ({ avatar, ...payload }, userId) => {
  const url = await saveFile(avatar);

  const student = await Student.create({
    ...payload,
    parentId: userId,
    avatarUrl: url,
  });

  return student;
};

export const deleteStudentById = async (studentId) => {
  const student = await Student.findByIdAndDelete(studentId);
  if (!student)
    throw createHttpError(404, 'Student you want to delete was not found!');
};

export const upsertStudent = async (
  studentId,
  { avatar, ...payload },
  options = {},
) => {
  const url = await saveFile(avatar);

  const rawResult = await Student.findByIdAndUpdate(
    studentId,
    { ...payload, avatarUrl: url },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Student not found!');
  }

  return {
    student: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};
