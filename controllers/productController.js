const Product = require("../models/products");

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
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Error fetching products.",
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
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestBody = JSON.parse(body);

      const productBody = {
        name: requestBody.name,
        description: requestBody.description,
        price: requestBody.price,
      };

      const newProduct = await Product.create(productBody);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: newProduct,
        })
      );
    });
  } catch (error) {}
};
