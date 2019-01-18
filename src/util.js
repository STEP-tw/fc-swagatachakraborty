const getFilePath = url => "./public" + url;

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

const writer = function(res, next, error) {
  if (error) sendNotFoud();
  send(res, 200, "");
  next();
};

const sendNotFound = function(res) {
  send(res, 404, "404: Not Found");
};

const parse = function(data) {
  let nameAndComment = data.split("&").map(x => x.replace(/\+/g, / /));
  let [name, comment] = nameAndComment.map(x => x.split("=")[1]);
  return {
    name,
    comment,
    date: Date()
  };
};

const addComment = function(path, fs, newComment, res, next) {
  fs.readFile(path, function(error, data) {
    if (error) sendNotFound();
    let allComments = JSON.parse(data);
    allComments.unshift(newComment);
    fs.writeFile(
      path,
      JSON.stringify(allComments),
      writer.bind(null, res, next)
    );
  });
};

module.exports = { getFilePath, reader, parse, send, writer, addComment };
