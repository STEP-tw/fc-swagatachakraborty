const display = function(comments) {
  let html = `
	<html>
  <head>
    <title>Guest Book</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1 class="heading"><a href="/"> << </a>Guest Book</h1>
    <form method="POST" action="/guest_book.html" onsubmit="storeComment()">
      <h1>Leave a comment</h1>
      Name:<input name="name" /> <br />
      Comment: <textarea name="comment" rows="3"></textarea> <br />
      <input type="submit" />
    </form>
		<hr />
		<table border=1px solid black>
			<thead>
				<tr>
					<th>NAME</th>
					<th>DATE AND TIME</th>
					<th>COMMENT</th>
				</tr>
			</thead>
			<tbody>
				${comments}
			</tbody>
		<table>
	</body>
	</html> `;
  return html;
};

const generateCommentTable = function(jsonComments) {
  return JSON.parse(jsonComments)
    .map(
      ({ name, date, comment }) =>
        `<tr>
		<td>${name}</td>
		<td>${date}</td>
		<td>${comment}</td>
		</tr>`
    )
    .join("");
};

module.exports = { display, generateCommentTable };
