const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const fileName = 'text-file.txt';
const writeStream = fs.createWriteStream(
  path.join(__dirname, fileName),
  'utf-8',
);
// console.log(writeStream);
const welcomeMessage = 'enter text\n';
const os = require('node:os');

stdout.write(welcomeMessage);

stdin.on('data', (data) => {
  //if user typed exit
  if (data.toString() === 'exit' + os.EOL) {
    process.exit();
  } else {
    writeStream.write(data);
  }
});

process.on('SIGINT', () => process.exit());

process.on('exit', () => stdout.write(`text saved in ${fileName}`));
