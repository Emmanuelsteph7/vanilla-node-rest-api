const http = require("http");
const fs = require("fs");
const { getProducts } = require("./controllers/productController");

const server = http.createServer((req, res) => {
  const pathname = req.url;
  const method = req.method;

  if (pathname === "/" && method === "GET") {
    getProducts(req, res);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
