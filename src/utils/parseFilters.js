const parseIntFilter = (unknown) => {
  if (typeof unknown !== 'string') return;
  const parsedInt = parseInt(unknown);
  if (Number.isNaN(parsedInt)) return;

  return parsedInt;
};

const parseFloatFilter = (unknown) => {
  if (typeof unknown !== 'string') return;
  const parsedFloat = parseFloat(unknown);
  if (Number.isNaN(parsedInt)) return;

  return parsedFloat;
};

const parseGenderFilter = (unknown) => {
  if (['male', 'female'].includes(unknown)) return unknown;
};

const parseBoolenFilter = (unknown) => {
  if (!['true', 'false'].includes(unknown)) return;

  return unknown === 'true' ? true : false;
};

export const parseFilters = (query) => {
  return {
    minAge: parseIntFilter(query.minAge),
    maxAge: parseIntFilter(query.maxAge),
    minAvgMark: parseFloatFilter(query.minAvgMark),
    maxAvgMark: parseFloatFilter(query.maxAvgMark),
    gender: parseGenderFilter(query.gender),
    onDuty: parseBoolenFilter(query.onDuty),
  };
};
