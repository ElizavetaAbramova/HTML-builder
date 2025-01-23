const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const fileName = 'text-file.txt';
const welcomeMessage = 'enter text\n';
const os = require('node:os');
let isInputEmpty = true;

fs.writeFile(path.join(__dirname, fileName), '', { flag: 'a+' }, (err) => {
  if (err) {
    stdout.write(`error: ${err}`);
  }
});

stdout.write(welcomeMessage);

stdin.on('data', (data) => {
  //if user typed exit
  if (data.toString() === 'exit' + os.EOL) {
    process.exit();
  } else {
    isInputEmpty = false;
    fs.writeFile(`02-write-file/${fileName}`, data, { flag: 'a+' }, (err) => {
      if (err) {
        stdout.write(`error: ${err}`);
      }
    });
  }
});

process.on('SIGINT', () => process.exit());

process.on('exit', () => {
  if (isInputEmpty) {
    stdout.write('\nno data to save');
  } else {
    stdout.write(`\ntext saved in ${fileName}`);
  }
});
