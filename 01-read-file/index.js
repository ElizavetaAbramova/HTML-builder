const fs = require('fs');
const path = 'D:/projects/HTML-builder/01-read-file/text.txt';
const readStream = fs.createReadStream(path);
readStream.on('data', (text) => console.log(text.toString()));

// method without stream
// fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log('error');
//     return;
//   } else {
//     console.log(data);
//   }
// });
