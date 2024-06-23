const parseSortOrder = (sortOrder) => {
  const isKnownOrder = ['asc', 'desc'].includes(sortOrder);

  if (isKnownOrder) return sortOrder;
  return 'asc';
};

const parseSortBy = (sortBy) => {
  const keyOfStudent = [
    '_id',
    'name',
    'age',
    'gender',
    'avgMark',
    'onDuty',
    'createdAt',
    'updatedAt',
  ];

  if (keyOfStudent.includes(sortBy)) return sortBy;

  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  return {
      sortOrder: parseSortOrder(sortOrder),
      sortBy: parseSortBy(sortBy),
  };
};
