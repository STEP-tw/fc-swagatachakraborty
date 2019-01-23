const fs = require("fs");
const { App } = require("./express");
const { Comments } = require("./comment");
const { User } = require("./user");
const {
  readBody,
  logger,
  serveFile,
  storeComments,
  renderGuestBook,
  updateComments,
  readCookie,
  login,
  logout
} = require("./requestHandlers");

const loadComments = fs => {
  const path = "./private/comments.json";
  if (!fs.existsSync(path)) {
    fs.mkdirSync("./private");
    fs.writeFileSync(path, "[]", err => {});
  }
  const comment = fs.readFileSync(path, "utf8");
  return JSON.parse(comment);
};

const comment = new Comments(loadComments(fs));
const app = new App();
const user = new User();

app.use(readBody);
app.use(readCookie);
app.use(logger);

app.get("/guest_book.html", renderGuestBook.bind(null, comment, user));
app.post("/login", login.bind(null, user));
app.post("/logout", logout.bind(null, user));
app.post("/addComment", storeComments.bind(null, comment, user, fs));
app.get("/updateComment", updateComments.bind(null, comment));

app.use(serveFile);

module.exports = app.handleRequests.bind(app);
