const fs = require('fs');
const path = require('path');
const folderToCopy = 'files';
const folderWithCopies = 'files-copy';

fs.mkdir(path.join(__dirname, folderWithCopies), { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

fs.readdir(path.join(__dirname, folderToCopy), (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach((item) => {
    fs.copyFile(
      path.join(__dirname, folderToCopy, item),
      path.join(__dirname, folderWithCopies, item),
      (err) => {
        if (err) {
          console.error(err);
        }
        console.log(`Файл ${item} успешно копирован`);
      },
    );
  });
  fs.readdir(path.join(__dirname, folderWithCopies), (err, copiedFiles) => {
    if (err) console.log(err);
    copiedFiles.forEach((copy) => {
      if (!files.includes(copy)) {
        fs.unlink(path.join(__dirname, folderWithCopies, copy), () => {});
      }
    });
  });
});
