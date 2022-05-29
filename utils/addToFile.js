const fs = require("fs");

exports.addToFile = (fileName, fileContent) => {
  fs.writeFileSync(fileName, JSON.stringify(fileContent), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};
