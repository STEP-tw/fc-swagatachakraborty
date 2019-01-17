const fs = require("fs");

const getFIlePath = url => "./public" + url;

const send = function (res, status, content) {
	res.statusCode = status;
	res.write(content);
	res.end();
};

const reader = function(res, error, data) {
	let status = 200;
	if(error){
		status = 404;
		data = '404: Not Found';
	}
	send(res, status, data);
};

const app = (req, res) => {
	let url = getFIlePath(req.url);
	if (req.url == "/") url = "./public/flowerCatalog.html";
	fs.readFile(url, reader.bind(null, res));
};

module.exports = app;
