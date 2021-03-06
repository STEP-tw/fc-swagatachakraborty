const reloadComments = function() {
  fetch("/updateComment")
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      let tableData = res.map(formatToTable).join("");
      document.getElementById("comments").innerHTML = tableData;
    });
};

const formatToTable = function(row) {
  return (
    "<tr> <td>" +
    new Date(row.date).toLocaleString() +
    "</td><td>" +
    row.name +
    "</td><td>" +
    row.comment +
    "</td> </tr>"
  );
};

const setCookie = function() {};
