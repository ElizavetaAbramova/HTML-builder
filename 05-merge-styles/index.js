const fs = require('fs');
const path = require('path');
const folderWithStyles = path.join(__dirname, 'styles');
const pathToBundlerFile = path.join(__dirname, 'project-dist', 'bundle.css');
const mergedStyles = fs.createWriteStream(pathToBundlerFile);

function merge() {
  fs.readdir(folderWithStyles, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      const pathToFile = path.join(folderWithStyles, file);
      if (path.extname(file) === '.css') {
        fs.stat(path.join(folderWithStyles, file), (err, stats) => {
          if (err) console.log(err);
          if (stats.isFile()) {
            const styles = fs.createReadStream(pathToFile, 'utf-8');
            styles.on('data', (dataChunk) => mergedStyles.write(dataChunk));
          }
        });
      }
    });
  });
}

merge();
