const getFilePath = function(url) {
  if (url == "/") return "./public/index.html";
  return "./public" + url;
};

const send = function(res, status, content) {
  res.statusCode = status;
  res.write(content);
  res.end();
};

const reader = function(res, error, data) {
  let status = 200;
  if (error) {
    sendNotFound(res);
    return;
  }
  send(res, status, data);
};

const sendNotFound = function(res) {
  send(res, 404, "404: Not Found");
};

const parse = function(data) {
  let nameAndComment = data.split("&").map(x => x.replace(/\+/g, " "));
  let [name, comment] = nameAndComment.map(x => x.split("=")[1]);
  return {
    name,
    comment,
    date: new Date()
  };
};

module.exports = { getFilePath, reader, parse, send };
