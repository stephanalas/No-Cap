const organizeFilters = (
  filters,
  filterOptions,
  colors = ['Black', 'Brown', 'Red', 'Green', 'Blue', 'Other-color'],
) => {
  // sets the filters in the corresponding array i.e  key === 'Black' and its value is true in filterOptions, filters.colors === ['Black']
  for (const key in filterOptions) {
    if (filterOptions[key]) {
      if (colors.includes(key)) {
        key === 'Other-color' ? filters.color.push('Other') : filters.color.push(key);
      } else if (key.includes(',')) {
        filters.priceRange.push(key);
      } else if (parseInt(key)) filters.avgRating.push(key);
      else if (filterOptions[key]) filters.category.push(key);
    }
  }
};

export default (filterOptions) => {
  const filters = {
    color: [],
    category: [],
    priceRange: [],
    avgRating: [],
  };
  organizeFilters(filters, filterOptions);
  return filters;
};
