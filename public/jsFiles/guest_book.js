const getGuestBookPage = function(comments, formFields) {
  return `
	<html>
  <head>
    <title>Guest Book</title>
		<link rel="stylesheet" href="/style.css" />
		<script src="/jsFiles/commentRefresher.js"> </script>
  </head>
  <body>
    <h1 class="heading"><a href="/"> << </a>Guest Book</h1>
    <div id='form'>
      ${formFields}
    </div>
		<hr />
		<h3> Comments
			<button onclick="reloadComments()"> &#x21bb; </button>
		</h3>
		<div >
			<table style="text-align: left;" width=100%>
				<thead>
					<tr>
					<th width=20%>DATE</th>
					<th width=20% >NAME</th>
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
