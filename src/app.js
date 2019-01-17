const fs = require("fs");
const Handler = require("./requestHandler");
const app = new Handler();

const getFIlePath = url => "./public" + url;

const logger = function(req, res) {
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);
  console.log("-------------------------------------------------------------");
};

const send = function(res, status, content) {
  res.statusCode = status;
  res.write(content);
  res.end();
};

const reader = function(res, error, data) {
  let status = 200;
  if (error) sendNotFound(res);
  send(res, status, data);
};

const sendNotFound = function(res) {
  send(res, 404, "404: Not Found");
};

const renderHome = (req, res) => {
  fs.readFile("./public/flowerCatalog.html", reader.bind(null, res));
};

const serveFile = function(req, res) {
  let url = getFIlePath(req.url);
  fs.readFile(url, reader.bind(null, res));
};

app.view(logger);
app.get("/", renderHome);
app.get("/style.css", serveFile);
app.get("/jarController.js", serveFile);
app.get("/images/flowers.jpg", serveFile);
app.get("/images/watering_jar.gif", serveFile);

module.exports = app.handleRequests.bind(app);
