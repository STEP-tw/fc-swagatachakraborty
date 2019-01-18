const Handler = require("./requestHandler");
const app = new Handler();
const {
  readBody,
  logger,
  renderHome,
  serveFile,
  storeComment,
  renderGuestBook
} = require("./handlers");

app.view(readBody);
app.view(logger);
app.get("/", renderHome);
app.get("/style.css", serveFile);
app.get("/jarController.js", serveFile);
app.get("/images/flowers.jpg", serveFile);
app.get("/guest_book.html", renderGuestBook);
app.get("/images/watering_jar.gif", serveFile);
app.post("/guest_book.html", storeComment);
app.get("/ageratum.html", serveFile);
app.get("/images/ageratum.jpg", serveFile);
app.get("/Ageratum.pdf", serveFile);
app.get("/abeliophyllum.html", serveFile);
app.get("/images/abeliophyllum.jpg", serveFile);
app.get("/Abeliophyllum.pdf", serveFile);

module.exports = app.handleRequests.bind(app);
