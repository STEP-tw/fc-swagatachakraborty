const reloadCmments = function() {
  fetch("/updateComment")
    .then(function(response) {
      return response.text();
    })
    .then(function(res) {
      document.getElementById("comments").innerHTML = res;
    });
};
