export default (products, { color, category }) => {
  console.log('called from utils', products);
  return products.filter((product) => {
    if (color.length) {
      if (color.includes(product.color) && category.includes(product.category))
        return true;
      else return false;
    } else {
      if (category.includes(product.category)) return true;
      else false;
    }
  });
};
