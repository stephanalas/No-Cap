// TURNS STRINGS THAT ARE FORMATED '0, 15' || '25, 50' || '50, null' AND RETURN IT IN THIS FORMAT [[0, 15], [25, 50], [50, null]]
const parseIntPriceRanges = (priceRanges) => {
  return priceRanges.map((range) => {
    return range.split(', ').map((stringNum) => parseInt(stringNum));
  });
};
// all filter functions take in the filteredProducts and the respective filters
const filterByColor = (colors, filteredProducts) => {
  return filteredProducts.filter((product) => {
    return colors.includes(product.color);
  });
};

const filterByPrice = (priceRanges, filteredProducts) => {
  return filteredProducts.filter((product) => {
    if (!priceRanges.length) return true;
    // product price is default string
    const price = parseFloat(product.price);

    // this loop decides whether or not include the product in the filteredProducts based on price ranges
    for (const range of priceRanges) {
      let passedFilter = false;
      const [lowestPrice, highestPrice] = range;
      if (!highestPrice) {
        if (price >= lowestPrice) passedFilter = true;
      } else if (!lowestPrice) {
        if (price <= highestPrice) passedFilter = true;
      } else if (price >= lowestPrice && price <= highestPrice) passedFilter = true;
      if (passedFilter) return true;
    }
    return false;
  });
};

const filterByRating = (avgRating, filteredProducts) => {
  return filteredProducts.filter((product) => {
    // if empty include everything VVV
    if (!avgRating.length) return true;

    const productRating = parseFloat(product.rating);

    let passedFilter = false;

    for (const rating of avgRating) {
      if (rating === 1) {
        if (productRating <= rating) return true;
      } else if (productRating >= rating) passedFilter = true;
      if (passedFilter) return true;
      return false;
    }
    return passedFilter;
  });
};

const filterByCategory = (categories, filteredProducts) => {
  return filteredProducts.filter((product) => {
    if (!categories.length) return true;
    let passedFilter = false;
    for (const cat of categories) {
      if (product.category === cat) passedFilter = true;
    }
    return passedFilter;
  });
};

export default (products, {
  category, color, priceRange, avgRating,
}) => {
  // converts price ranges from strings to integer in a format of a nested Array [[0, 15], [15,50], [50, null]]
  const priceRanges = parseIntPriceRanges(priceRange);
  // converts avgRating to integers
  const avgRatings = avgRating.map((rating) => {
    return parseInt(rating);
  });

  let filteredProducts = products;

  if (color.length) {
    filteredProducts = filterByColor(color, filteredProducts);
  }

  if (priceRanges.length) {
    filteredProducts = filterByPrice(priceRanges, filteredProducts);
  }
  if (avgRatingIntegers.length) {
    filteredProducts = filterByRating(avgRatings, filteredProducts);
  }
  if (category.length) {
    filteredProducts = filterByCategory(category, filteredProducts);
  }
  return filteredProducts;
};
