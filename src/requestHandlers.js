const fs = require("fs");
const { display } = require("../public/guest_book");
const { getFilePath, reader, parse, send } = require("./util");

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

const serveFile = function(req, res, next) {
  let url = getFilePath(req.url);
  fs.readFile(url, reader.bind(null, res));
  next();
};

const renderGuestBook = function(comment, req, res, next) {
  let tableFormatComment = comment.formatComments();
  let htmlComtent = display(tableFormatComment);
  send(res, 200, htmlComtent);
};

const storeComment = function(comment, fs, req, res, next) {
  const newComment = parse(req.body);
  comment.addComment(newComment);
  fs.writeFile("./public/comments.json", comment.getComments(), err => {
    if (err) {
      sendNotFoud();
      return;
    }
    renderGuestBook(comment, req, res, next);
  });
};

module.exports = {
  readBody,
  logger,
  serveFile,
  renderGuestBook,
  storeComment
};
