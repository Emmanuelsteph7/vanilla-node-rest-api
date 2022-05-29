const http = require("http");
const fs = require("fs");
const { getProducts, getProduct } = require("./controllers/productController");

const server = http.createServer((req, res) => {
  const pathname = req.url;
  const method = req.method;

  const singleProductRegex = /\/api\/product\/([0-9 | a-z]+)/;

  if (pathname === "/api/products" && method === "GET") {
    getProducts(req, res);
  } else if (pathname.match(singleProductRegex) && method === "GET") {
    const id = pathname.split("/")[3];
    getProduct(req, res, id);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({ message: "Route not found!" }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
