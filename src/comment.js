class Comments {
  constructor(comments) {
    this.comments = comments;
  }

  getComments() {
    return JSON.stringify(this.comments);
  }

  addComment(newComment) {
    this.comments.unshift(newComment);
  }

  formatComments() {
    return this.comments
      .map(
        x =>
          "<tr> <td>" +
          new Date(x.date).toLocaleString() +
          "</td><td>" +
          x.name +
          "</td><td>" +
          x.comment +
          "</td> </tr>"
      )
      .join("\n");
  }
}

module.exports = { Comments };
