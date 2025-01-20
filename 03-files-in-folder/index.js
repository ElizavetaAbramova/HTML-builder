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
          `${path.basename(file, path.extname(file))} - ${path
            .extname(file)
            .slice(1)} - ${stats.size} bytes`,
        );
      }
    });
  });
});
