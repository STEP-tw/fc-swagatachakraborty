const fs = require("fs");
const { App } = require("./frameWork");
const { Comments } = require("./comment");
const {
  readBody,
  logger,
  serveFile,
  storeComment,
  renderGuestBook
} = require("./requestHandlers");

const loadComments = () => {
  const comment = fs.readFileSync("./public/comments.json", "utf8");
  return JSON.parse(comment);
};

const comment = new Comments(loadComments());
const app = new App();

app.use(readBody);
app.use(logger);
app.get("/guest_book.html", renderGuestBook.bind(null, comment));
app.post("/guest_book.html", storeComment.bind(null, comment, fs));
app.use(serveFile);

module.exports = app.handleRequests.bind(app);
