const fs = require("fs");
const { getGuestBookPage } = require("../public/jsFiles/guest_book");
const { getFilePath, reader, parse, send, getFormElements, decode } = require("./util");

const readBody = function(req, res, next) {
  let content = "";
  req.on("data", data => (content += data));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const readCookie = function(req, res, next) {
  const cookie = req.headers["cookie"];
  res.setHeader("User", `userId=${cookie}`);
  next();
};

const logger = function(req, res, next) {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("-------------------------------------------------------------");
  next();
};

const serveFile = function(req, res) {
  let url = getFilePath(req.url);
  fs.readFile(url, reader.bind(null, res));
};

const storeComments = function(comment, user, fs, req, res) {
  const newComment = parse(req.body);
  newComment.name = user.getId();
  comment.addComment(newComment);
  fs.writeFile("./private/comments.json", comment.getComments(), err => {
    if (err) {
      sendNotFound();
      return;
    }
  });
  redirectToGuestBook(res);
};

const renderGuestBook = function(comment, user, req, res) {
  const form = getFormElements(user.getLogedInStatus(), user.getId());
  const tableFormatComment = comment.formatComments();
  const htmlComtent = getGuestBookPage(tableFormatComment, form);
  send(res, 200, htmlComtent);
};

const updateComments = function(comment, req, res) {
  send(res, 200, comment.getComments());
};

const redirectToGuestBook = function(res) {
  res.writeHead(302, {
    Location: "/guest_book.html"
  });
  res.end();
};

const login = function(user, req, res) {
  const cookie = decode(req.body);
  res.setHeader("Set-Cookie", `username=${cookie}`);
  user.setUser(cookie);
  user.logIn();
  redirectToGuestBook(res);
};

const logout = function(user, req, res) {
  const expireTime = new Date(Date.now() - 1).toGMTString();
  res.setHeader("Set-Cookie", `username=delete; expires=${expireTime}`);
  user.removeUser();
  user.logOff();
  redirectToGuestBook(res);
};

module.exports = {
  readBody,
  logger,
  serveFile,
  renderGuestBook,
  storeComments,
  updateComments,
  readCookie,
  login,
  logout
};
