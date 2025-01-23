const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const projectFolder = path.join(__dirname, 'project-dist');
const folderWithStyles = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const mergedStyles = fs.createWriteStream(
  path.join(projectFolder, 'style.css'),
);
const indexFile = path.join(projectFolder, 'index.html');
const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');

//create folder for project
function createProjectFolder() {
  fs.mkdir(projectFolder, { recursive: true }, (err) => {
    if (err) console.error(err);
  });
}
//copy all folder assets to project folder
function copyAssets() {
  fs.cp(
    assetsFolder,
    path.join(projectFolder, 'assets'),
    { recursive: true },
    (err) => {
      if (err) console.log(err);
    },
  );
}
//copy all styles to style.css
function copyStyles() {
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

function readFileWithFS(file) {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) console.log(err);
    readDirectory(componentsFolder, data);
  });
}

function readDirectory(folder, data) {
  fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      const pathToFile = path.join(componentsFolder, file.name);

      if (path.extname(pathToFile) === '.html') {
        const fileName = file.name.slice(0, file.name.indexOf('.'));
        fs.readFile(pathToFile, 'utf-8', (err, content) => {
          if (err) console.log(err);
          data = data.replaceAll(`{{${fileName}}}`, content);
          fs.writeFile(indexFile, data, (err) => err);
        });
      }
    });
  });
}

//create index.html filling
function fillIndexFile() {
  fs.copyFile(templateFile, indexFile, (err) => {
    if (err) console.log(err);
    readFileWithFS(indexFile);
  });
}

async function bundle() {
  await createProjectFolder();
  await copyAssets();
  await copyStyles();
  fillIndexFile();
}

bundle();
