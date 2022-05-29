const products = require(`../data/products.json`);

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const filteredProduct = products.find((item) => item.id === Number(id));

    resolve(filteredProduct);
  });
};
