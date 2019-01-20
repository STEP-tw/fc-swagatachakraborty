const fs = require("fs");
const { getGuestBookPage } = require("../public/jsFiles/guest_book");
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

const serveFile = function(req, res) {
  let url = getFilePath(req.url);
  fs.readFile(url, reader.bind(null, res));
};

const renderGuestBook = function(comment, req, res) {
  let tableFormatComment = comment.formatComments();
  let htmlComtent = getGuestBookPage(tableFormatComment);
  send(res, 200, htmlComtent);
};

const storeComments = function(comment, fs, req, res) {
  const newComment = parse(req.body);
  if (!newComment.name || !newComment.comment) {
    renderGuestBook(comment, req, res);
    return;
  }
  comment.addComment(newComment);
  fs.writeFile("./hidden/comments.json", comment.getComments(), err => {
    if (err) {
      sendNotFoud();
      return;
    }
    renderGuestBook(comment, req, res);
  });
};

module.exports = {
  readBody,
  logger,
  serveFile,
  renderGuestBook,
  storeComments
};
