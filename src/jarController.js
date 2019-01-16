const getElement = (document, id) => document.getElementById(id);

const hide = function(id) {
  let element = getElement(document, id);
  element.style.visibility = "hidden";
  setTimeout(function() {
    element.style.visibility = "visible";
  }, 1000);
};
