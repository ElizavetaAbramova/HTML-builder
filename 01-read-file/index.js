const fs = require('fs');
const path = require('path');
const fileName = 'text.txt';
const pathToFile = path.join(__dirname, fileName);
const readStream = fs.createReadStream(pathToFile);
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
