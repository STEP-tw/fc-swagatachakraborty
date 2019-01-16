const fs = require("fs");

const app = (req, res) => {
  const reader = function(error, data) {
    res.write(data);
    res.end();
  };

  if (req.url == "/") {
    fs.readFile("./src/flowerCatalog.html", "utf8", reader);
  }

  if (req.url == "/images/flowers.jpg") {
    fs.readFile("./src/images/flowers.jpg", reader);
  }

  if (req.url == "/images/watering_jar.gif") {
    fs.readFile("./src/images/watering_jar.gif", reader);
  }

  if (req.url == "/style.css") {
    fs.readFile("./src/style.css", "utf8", reader);
  }
};

module.exports = app;
