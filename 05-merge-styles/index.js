const fs = require('fs');
const path = require('path');
const folderWithStyles = path.join(__dirname, 'styles');
const pathToBundlerFile = '05-merge-styles/project-dist/bundle.css';

fs.readdir(folderWithStyles, (err, files) => {
  fs.unlink(pathToBundlerFile, () => {});
  if (err) console.log(err);
  let cssFiles = cssFilesFilter(files);
  console.log(cssFiles);
});

function copyStylesToBundle(path, data) {
  fs.writeFile(path, data, { flag: 'a+' }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function readFiles(pathToFolder, file) {
  fs.readFile(
    path.join(pathToFolder, file),
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) {
        console.log('error');
      } else {
        copyStylesToBundle(pathToBundlerFile, data);
      }
    },
  );
}

function cssFilesFilter(array) {
  let filtered = array.filter((item) => path.extname(item) === '.css');
  filtered.forEach((file) => {
    fs.stat(path.join(folderWithStyles, file), (err, stats) => {
      if (err) console.log(err);
      if (stats.isFile()) {
        readFiles(folderWithStyles, file);
      }
    });
  });
}
