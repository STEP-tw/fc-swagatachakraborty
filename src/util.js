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
  let comment = data
    .split("=")
    .pop()
    .replace(/\+/g, " ");
  console.log(data, "in parse");
  return {
    comment,
    date: new Date()
  };
};

const getFormElements = function(hasLogedIn, user) {
  if (hasLogedIn) {
    return `<form method="POST" action="/logout">
		Name ${user} <button>Logout</button><br><br>
		</form>
		<form method='POST' action='/addComment'>
		Comment: <textarea id='a' name="comment" rows="3" required></textarea> <br><br>
		<input type="submit">
		</form>`;
  }
  return `<form method="POST" action="/login">
	<h1>Login to comment</h1>
	Name:<input name="name" required/> 
	<button> Login </button>
	</form>`;
};

module.exports = { getFilePath, reader, parse, send, getFormElements };
