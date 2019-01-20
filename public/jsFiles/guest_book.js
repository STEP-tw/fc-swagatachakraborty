const getGuestBookPage = function(comments) {
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
		<table style="text-align: left;" width=100%>
			<thead>
				<tr>
					<th width=20% >NAME</th>
					<th width=20%>DATE AND TIME</th>
					<th width=60%>COMMENT</th>
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

module.exports = { getGuestBookPage };
