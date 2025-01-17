const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
// const replace = require('replace');
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
fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) console.error(err);
});
//copy all folder assets to project folder
fs.cp(
  assetsFolder,
  path.join(projectFolder, 'assets'),
  { recursive: true },
  (err) => {
    if (err) console.log(err);
  },
);
//copy all styles to style.css
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

//create index.html filling
async function fillIndexFile() {
  fs.copyFile(templateFile, indexFile, (err) => err);
  let contentIndexFile = await fsPromise.readFile(indexFile, 'utf-8', (err) => err);
  let filesInComponentsFolder = await fsPromise.readdir(componentsFolder, { withFileTypes: true });

  filesInComponentsFolder.forEach(async (file) => {
    const pathToFile = path.join(componentsFolder, file.name);
    const fileExtension = path.extname(pathToFile);

    if (path.extname(pathToFile) === '.html') {
      const fileContent = await fsPromise.readFile(pathToFile, 'utf-8', (err) => err);
      const fileName = file.name.replace(fileExtension, '');
      contentIndexFile = contentIndexFile.replace(`{{${fileName}}}`, fileContent);
      await fsPromise.writeFile(indexFile, contentIndexFile);
    }
  });
}

fillIndexFile();
