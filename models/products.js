const products = require(`../data/products.json`);
const { addToFile } = require("../utils/addToFile");
const { v4 } = require("uuid");

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const filteredProduct = products.find((item) => item.id === id);

    resolve(filteredProduct);
  });
};

exports.create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: v4(), ...product };
    products.push(newProduct);

    addToFile("./data/products.json", products);
    resolve(newProduct);
  });
};

exports.update = (product) => {
  return new Promise((resolve, reject) => {
    const productIndex = products.findIndex((item) => item.id === product.id);

    products.splice(productIndex, 1, product);

    addToFile("./data/products.json", products);
    resolve(product);
  });
};
