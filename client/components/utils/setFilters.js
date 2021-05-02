export default (filterOptions) => {
  const filters = {
    color: [],
    category: [],
  };
  const colors = ['Black', 'Brown', 'Red', 'Green', 'Blue', 'Other'];
  for (const key in filterOptions) {
    if (colors.includes(key) && filterOptions[key]) {
      filters.color.push(key);
    } else if (!colors.includes(key) && filterOptions[key]) {
      filters.category.push(key);
    }
  }
  return filters;
};
