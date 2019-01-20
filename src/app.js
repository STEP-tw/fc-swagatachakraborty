const fs = require("fs");
const { App } = require("./frameWork");
const { Comments } = require("./comment");
const {
  readBody,
  logger,
  serveFile,
  storeComments,
  renderGuestBook
} = require("./requestHandlers");

const loadComments = fs => {
  const path = "./hidden/comments.json";
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
app.use(serveFile);

module.exports = app.handleRequests.bind(app);
