import { filter } from '../util.js';

const generateFilter = (points) => {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export { generateFilter };