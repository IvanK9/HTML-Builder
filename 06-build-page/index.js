const path = require('path');
const fs = require('fs');
const pathProjectDist = path.resolve(__dirname, 'project-dist');
const pathComponents = path.resolve(__dirname, 'components');
const pathIndex = path.resolve(__dirname, 'project-dist/index.html');
const pathTemplate = path.resolve(__dirname, 'template.html');
const stylesPath = path.resolve(__dirname, 'styles');
const projectDistPath = path.resolve(__dirname, 'project-dist/style.css');
const writebleStream = fs.createWriteStream(projectDistPath);

// Создаем index
fs.mkdir(pathProjectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

(function replaceTag() {
  fs.readFile(pathTemplate, 'utf-8', (err, data) => {
    if (err) throw err;
    let templateContent = data.toString();

    fs.writeFile(pathIndex, '', (err) => {
      if (err) throw err;
    });

    fs.readdir(pathComponents, function (err, data) {
      if (err) throw err;

      data.forEach((el) => {
        let tag = `{{${el.replace('.html', '')}}}`;
        const test = path.resolve(__dirname, 'components', el);

        fs.readFile(test, 'utf-8', (err, data) => {
          if (err) throw err;
          let componentContent = data.toString();
          templateContent = templateContent.replace(tag, componentContent);
          const writebleStreamIndex = fs.createWriteStream(pathIndex);
          writebleStreamIndex.write(templateContent);
        });
      });
    });
  });
})();

// Создаем стили

fs.readdir(stylesPath, { withFileTypes: true }, function (err, data) {
  data.forEach((el) => {
    const filePath = path.resolve(__dirname, 'styles', el.name);
    const extname = path.extname(filePath);
    fs.writeFile(projectDistPath, '', (err) => {
      if (err) throw err;
    });
    if (extname == '.css') {
      const readableStream = fs.createReadStream(
        path.resolve(stylesPath, el.name),
      );
      readableStream.on('data', (data) => {
        writebleStream.write(`${data.toString()}\n`);
      });
    }
  });
});

// Копируем папку
const pathAssets = path.resolve(__dirname, 'assets');
const pathAssetsCopy = path.resolve(pathProjectDist, 'assets');

(function copyDir() {
  fs.mkdir(pathAssetsCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(pathAssetsCopy, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (file.name == 'assets') {
        fs.rmdir(
          path.resolve(pathAssetsCopy, file.name),
          { force: true },
          (err) => {
            if (err) throw err;
          },
        );
      }
    }
  });
  fs.readdir(pathAssets, { withFileTypes: true }, function (err, data) {
    data.forEach((el) => {
      const filePath = path.resolve(__dirname, 'assets', el.name);
      const fileCopyPath = path.resolve(pathProjectDist, 'assets', el.name);

      if (el.isDirectory()) {
        fs.mkdir(
          path.resolve(pathAssetsCopy, el.name),
          { recursive: true },
          (err) => {
            if (err) throw err;
          },
        );
        fs.readdir(filePath, { withFileTypes: true }, function (err, data) {
          data.forEach((el) => {
            const filePath1 = path.resolve(filePath, el.name);
            const fileCopyPath1 = path.resolve(fileCopyPath, el.name);
            function callback(err) {
              if (err) throw err;
            }
            fs.copyFile(filePath1, fileCopyPath1, callback);
          });
        });
      }
    });
  });
})();
