import { cafes, categories, promos } from '../data/cafes';

const MOCK_DATA = {
  cafes,
  categories,
  promos
};

export const fetchData = () => {
  return new Promise((resolve) => {
    // Simulate network delay (1.5 seconds)
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1500);
  });
};
