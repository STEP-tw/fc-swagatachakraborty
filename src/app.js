const fs = require("fs");

const app = (req, res) => {
  if (req.url == "/") {
    fs.readFile("./src/flowerCatalog.html", "utf8", (err, data) => {
      res.write(data);
      res.end();
    });
  }

  if (req.url == "/src/images/flowers.jpg") {
    fs.readFile("./src/images/flowers.jpg", (err, data) => {
      res.write(data);
      res.end();
    });
  }
};

module.exports = app;
