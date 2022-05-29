const Product = require("../models/products");
const { getPostBody } = require("../utils/getPostBody");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: products,
      })
    );
  } catch (error) {
    console.log(error);
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: error,
      })
    );
  }
};

exports.getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: product,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Product not found.",
        })
      );
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: error,
      })
    );
  }
};

exports.createProduct = async (req, res) => {
  try {
    let { name, description, price } = await getPostBody(req);
    const productBody = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(productBody);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: newProduct,
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: error,
      })
    );
  }
};

exports.updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    let body = await getPostBody(req);

    const productBody = {
      ...product,
      ...body,
    };

    const newProduct = await Product.update(productBody);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: newProduct,
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: error,
      })
    );
  }
};

exports.deleteProduct = async (req, res, id) => {
  try {
    await Product.delete(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: "Product deleted.",
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: error,
      })
    );
  }
};
