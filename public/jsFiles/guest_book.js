const getGuestBookPage = function(comments) {
  return `
	<html>
  <head>
    <title>Guest Book</title>
		<link rel="stylesheet" href="/style.css" />
		<script src="/jsFiles/commentRefresher.js"> </script>
  </head>
  <body>
    <h1 class="heading"><a href="/"> << </a>Guest Book</h1>
    <form method="POST" action="/guest_book.html">
      <h1>Leave a comment</h1>
      Name:<input name="name" required/> <br />
      Comment: <textarea name="comment" rows="3" required></textarea> <br />
      <input type="submit" />
    </form>
		<hr />
		<h3> Comments
			<button onclick="reloadCmments()"> &#x21bb; </button>
		</h3>
		<div >
			<table style="text-align: left;" width=100%>
				<thead>
					<tr>
						<th width=20% >NAME</th>
						<th width=20%>DATE AND TIME</th>
						<th width=60%>COMMENT</th>
					</tr>
				</thead>
				<tbody id="comments">
					${comments}
				</tbody>
			<table>
		</div>
	</body>
	</html> `;
};

module.exports = { getGuestBookPage };
