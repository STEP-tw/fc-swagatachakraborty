const fs = require("fs");
const { display, generateCommentTable } = require("../public/guest_book");
const {
  getFilePath,
  reader,
  parse,
  addComment,
  sendNotFound
} = require("./util");

const readBody = function(req, res, next) {
  let content = "";
  req.on("data", data => (content += data));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const logger = function(req, res, next) {
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("-------------------------------------------------------------");
  next();
};

const renderHome = (req, res, next) => {
  fs.readFile("./public/index.html", reader.bind(null, res));
  next();
};

const serveFile = function(req, res, next) {
  let url = getFilePath(req.url);
  fs.readFile(url, reader.bind(null, res));
  next();
};

const renderGuestBook = function(req, res, next) {
  let path = "./public/comments.json";
  fs.readFile(path, (err, data) => {
    if (err) sendNotFound();
    let commentTable = generateCommentTable(data);
    let guestBook = display(commentTable);
    res.write(guestBook);
    res.end();
  });
};

const storeComment = function(req, res, next) {
  let userComments = parse(req.body);
  let path = "./public/comments.json";
  addComment(path, fs, userComments, res, next);
  renderGuestBook(req, res, next);
};

module.exports = {
  readBody,
  logger,
  renderHome,
  serveFile,
  renderGuestBook,
  storeComment
};
