// 03-files-in-folder/secret-folder
// <file name>-<file extension>-<file size></file>
const fs = require('fs');
const path = require('path');
const folderName = 'secret-folder';
const folderPath = path.join(__dirname, folderName);

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach((file) => {
    fs.stat(path.join(folderPath, file), (err, stats) => {
      if (err) {
        console.log(err);
      }
      if (!stats.isDirectory()) {
        console.log(
          `${path.basename(file, path.extname(file))} - ${path.extname(file)} - ${stats.size} bytes`,
        );
      }
    });
  });
});
