const parseIntFilter = (unknown) => {
  if (typeof unknown !== 'string') return;
  const parsedInt = parseInt(unknown);
  if (Number.isNaN(parsedInt)) return;

  return parsedInt;
};

const parseFloatFilter = (unknown) => {
  if (typeof unknown !== 'string') return;
  const parsedFloat = parseFloat(unknown);
  if (Number.isNaN(parsedFloat)) return;

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
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark, onDuty } = query;
  return {
    minAge: parseIntFilter(minAge),
    maxAge: parseIntFilter(maxAge),
    minAvgMark: parseFloatFilter(minAvgMark),
    maxAvgMark: parseFloatFilter(maxAvgMark),
    gender: parseGenderFilter(gender),
    onDuty: parseBoolenFilter(onDuty),
  };
};
