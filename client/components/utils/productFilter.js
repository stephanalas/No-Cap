export default (products, { color, category }) => {
  console.log('called from utils', products);
  return products.filter((product) => {
    if (color.length) {
      if (color.includes(product.color) && category.includes(product.category)) return true;
      return false;
    }
    if (category.includes(product.category)) return true;
    false;
  });
};
