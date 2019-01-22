const fs = require("fs");
const { App } = require("./express");
const { Comments } = require("./comment");
const {
  readBody,
  logger,
  serveFile,
  storeComments,
  renderGuestBook,
  updateComments
} = require("./requestHandlers");

const loadComments = fs => {
  const path = "./private/comments.json";
  if (!fs.existsSync(path)) return;
  const comment = fs.readFileSync(path, "utf8");
  return JSON.parse(comment);
};

const comment = new Comments(loadComments(fs));
const app = new App();

app.use(readBody);
app.use(logger);
app.get("/guest_book.html", renderGuestBook.bind(null, comment));
app.post("/guest_book.html", storeComments.bind(null, comment, fs));
app.get("/updateComment", updateComments.bind(null, comment));
app.use(serveFile);

module.exports = app.handleRequests.bind(app);
