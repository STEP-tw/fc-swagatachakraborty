const { Comments } = require("../src/Comment");
const fs = require("fs");
const assert = require("assert");
const oldComment = fs.readFileSync("./public/comments.json", "utf8");
const comments = new Comments(JSON.parse(oldComment));
describe("addComment", function() {
  it("Should update the its comments variable by adding the new comment at the begining", function() {
    let newComment = {
      name: "swagata",
      date: "1/18/2019, 1:20:11 PM",
      comment: "good"
    };

    let expectedOutput = [
      {
        name: "swagata",
        date: "1/18/2019, 1:20:11 PM",
        comment: "good"
      },
      {
        name: "Reek/ /Ghosh/ /",
        comment: "bad/ /experience",
        date: "Sat Jan 19 2019 09:41:22 GMT+0530 (IST)"
      },
      {
        name: "Rimpi",
        comment: "good/ /service",
        date: "Fri Jan 18 2019 14:59:03 GMT+0530 (IST)"
      }
    ];
    comments.addComment(newComment);
    assert.deepEqual(comments.getComment(), expectedOutput);
  });
});

describe("formateComments", function() {
  it("should format the comments to a html table format", function() {
    let expectedOutput =
      "<tr> <td>swagata</td><td>1/18/2019, 1:20:11 PM</td><td>good</td> </tr>\n";
    expectedOutput +=
      "<tr> <td>Reek/ /Ghosh/ /</td><td>Sat Jan 19 2019 09:41:22 GMT+0530 (IST)</td><td>bad/ /experience</td> </tr>\n";
    expectedOutput +=
      "<tr> <td>Rimpi</td><td>Fri Jan 18 2019 14:59:03 GMT+0530 (IST)</td><td>good/ /service</td> </tr>";
    assert.equal(comments.formatComments(), expectedOutput);
  });
});
