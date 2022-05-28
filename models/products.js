const products = require(`../data/products.json`);

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};
